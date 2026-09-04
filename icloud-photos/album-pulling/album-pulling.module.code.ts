import { basename, isAbsolute, join, resolve } from "node:path"
import { DataError, InputError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

const RESOLVE_URL =
  "https://ckdatabasews.icloud.com/database/1/com.apple.photos.cloud/production/public/records/resolve"

const QUERY_PATH = "/database/1/com.apple.photos.cloud/production/shared/records/query"

const QUERY_PARAMS =
  "remapEnums=true&getCurrentSyncToken=true&clientBuildNumber=2622Build17&clientMasteringNumber=2622Build17"

const RECORD_TYPE = "CPLAssetAndMasterByAssetDateWithoutHiddenOrDeleted"

const PAGE_SIZE = 200

export interface ShareContext {
  readonly partition: string
  readonly authToken: string
  readonly zoneName: string
  readonly zoneType: string
  readonly ownerRecordName: string
}

export interface PhotoAsset {
  readonly recordName: string
  readonly filename: string
  readonly downloadURL: string
  readonly size: number
}

export interface PhotoTarget {
  readonly asset: PhotoAsset
  readonly path: string
}

export interface CloudKitRequest<Body> {
  readonly url: string
  readonly body: Body
}

interface ResolveRequestBody {
  readonly shortGUIDs: readonly { readonly value: string }[]
}

interface QueryFilterClause {
  readonly fieldName: string
  readonly comparator: string
  readonly fieldValue: { readonly value: string | number; readonly type: string }
}

interface QueryRequestBody {
  readonly query: { readonly recordType: string; readonly filterBy: readonly QueryFilterClause[] }
  readonly zoneID: {
    readonly zoneName: string
    readonly zoneType: string
    readonly ownerRecordName: string
  }
  readonly resultsLimit: number
}

function firstIssue(err: z.ZodError): string {
  const issue = err.issues[0]
  if (issue === undefined) return "unknown validation error"
  const path = issue.path.join(".")
  return path.length > 0 ? `${path}: ${issue.message}` : issue.message
}

export function parseShareToken(shareUrl: string): string {
  let url: URL
  try {
    url = new URL(shareUrl)
  } catch {
    throw new InputError(`not a URL: ${shareUrl}`)
  }
  if (url.hostname !== "share.icloud.com") {
    throw new InputError(`not an iCloud share URL (expected host share.icloud.com): ${shareUrl}`)
  }
  const segments = url.pathname.split("/").filter((s) => s.length > 0)
  const token = segments[1]
  if (segments[0] !== "photos" || token === undefined) {
    throw new InputError(`not an iCloud shared-album URL (expected /photos/<token>): ${shareUrl}`)
  }
  return token
}

export function buildResolveRequest(token: string): CloudKitRequest<ResolveRequestBody> {
  return { url: RESOLVE_URL, body: { shortGUIDs: [{ value: token }] } }
}

const ZoneIdSchema = z
  .object({
    zoneName: z.string(),
    zoneType: z.string(),
    ownerRecordName: z.string(),
  })
  .passthrough()

const AnonAccessSchema = z
  .object({
    token: z.string().min(1),
    databasePartition: z.string().min(1),
  })
  .passthrough()

const ResolveResponseSchema = z
  .object({
    results: z
      .array(
        z.object({ anonymousPublicAccess: AnonAccessSchema, zoneID: ZoneIdSchema }).passthrough()
      )
      .min(1),
  })
  .passthrough()

export function parseResolveResponse(raw: unknown): ShareContext {
  const parsed = ResolveResponseSchema.safeParse(raw)
  if (!parsed.success) {
    throw new DataError(`iCloud resolve response malformed: ${firstIssue(parsed.error)}`)
  }
  const result = parsed.data.results[0]
  if (result === undefined) {
    throw new DataError("iCloud resolve response contained no results")
  }
  return {
    partition: result.anonymousPublicAccess.databasePartition,
    authToken: result.anonymousPublicAccess.token,
    zoneName: result.zoneID.zoneName,
    zoneType: result.zoneID.zoneType,
    ownerRecordName: result.zoneID.ownerRecordName,
  }
}

export function buildQueryRequest(
  ctx: ShareContext,
  startRank: number
): CloudKitRequest<QueryRequestBody> {
  const url = `${ctx.partition}${QUERY_PATH}?${QUERY_PARAMS}&publicAccessAuthToken=${encodeURIComponent(ctx.authToken)}`
  const body: QueryRequestBody = {
    query: {
      recordType: RECORD_TYPE,
      filterBy: [
        {
          fieldName: "startRank",
          comparator: "EQUALS",
          fieldValue: { value: startRank, type: "INT64" },
        },
        {
          fieldName: "direction",
          comparator: "EQUALS",
          fieldValue: { value: "ASCENDING", type: "STRING" },
        },
      ],
    },
    zoneID: {
      zoneName: ctx.zoneName,
      zoneType: ctx.zoneType,
      ownerRecordName: ctx.ownerRecordName,
    },
    resultsLimit: PAGE_SIZE,
  }
  return { url, body }
}

const OriginalResSchema = z
  .object({ value: z.object({ downloadURL: z.string().min(1), size: z.number() }).passthrough() })
  .passthrough()

const MasterFieldsSchema = z
  .object({
    filenameEnc: z.object({ value: z.string() }).passthrough(),
    resOriginalRes: OriginalResSchema,
  })
  .passthrough()

const QueryRecordSchema = z
  .object({
    recordType: z.string(),
    recordName: z.string(),
    fields: z.unknown(),
  })
  .passthrough()

const QueryResponseSchema = z.object({ records: z.array(QueryRecordSchema) }).passthrough()

export function safeFilename(encoded: string, fallbackStem: string): string {
  let decoded = ""
  try {
    decoded = Buffer.from(encoded, "base64").toString("utf8")
  } catch {
    decoded = ""
  }
  const base = basename(decoded.replaceAll("\\", "/")).trim()
  const usable = base.length > 0 && base !== "." && base !== ".." && !base.includes("\0")
  return usable ? base : `${fallbackStem}.heic`
}

export function parseQueryPage(raw: unknown): readonly PhotoAsset[] {
  const parsed = QueryResponseSchema.safeParse(raw)
  if (!parsed.success) {
    throw new DataError(`iCloud query response malformed: ${firstIssue(parsed.error)}`)
  }
  const assets: PhotoAsset[] = []
  for (const record of parsed.data.records) {
    if (record.recordType !== "CPLMaster") continue
    const fields = MasterFieldsSchema.safeParse(record.fields)
    if (!fields.success) {
      throw new DataError(
        `iCloud master ${record.recordName} missing original asset: ${firstIssue(fields.error)}`
      )
    }
    assets.push({
      recordName: record.recordName,
      filename: safeFilename(fields.data.filenameEnc.value, record.recordName),
      downloadURL: fields.data.resOriginalRes.value.downloadURL,
      size: fields.data.resOriginalRes.value.size,
    })
  }
  return assets
}

export function nextStartRank(
  currentStartRank: number,
  pageAssetCount: number
): number | undefined {
  return pageAssetCount === 0 ? undefined : currentStartRank + pageAssetCount
}

export function resolveOutputDir(outFlag: string | undefined, cwd: string): string {
  if (outFlag === undefined) return cwd
  return isAbsolute(outFlag) ? outFlag : resolve(cwd, outFlag)
}

function disambiguate(filename: string, taken: ReadonlySet<string>): string {
  if (!taken.has(filename)) return filename
  const dot = filename.lastIndexOf(".")
  const stem = dot > 0 ? filename.slice(0, dot) : filename
  const ext = dot > 0 ? filename.slice(dot) : ""
  for (let n = 2; ; n++) {
    const candidate = `${stem}-${n}${ext}`
    if (!taken.has(candidate)) return candidate
  }
}

export function dedupePaths(assets: readonly PhotoAsset[], dir: string): readonly PhotoTarget[] {
  const taken = new Set<string>()
  const targets: PhotoTarget[] = []
  for (const asset of assets) {
    const name = disambiguate(asset.filename, taken)
    taken.add(name)
    targets.push({ asset, path: join(dir, name) })
  }
  return targets
}
