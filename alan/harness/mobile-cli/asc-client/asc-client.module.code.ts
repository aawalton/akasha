import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"
import { ASC_ISSUER_ID, ASC_KEY_ID } from "../foundation/foundation.module.code.ts"

export const ASC_KEY_LOCAL_PATH = `${homedir()}/.appstoreconnect/private_keys/AuthKey_${ASC_KEY_ID}.p8`

const ASC_API_BASE = "https://api.appstoreconnect.apple.com"

export const JWT_TTL_SECONDS = 900

export const JWT_REMINT_MARGIN_SECONDS = 120

function base64Url(input: ArrayBuffer | Uint8Array | string): string {
  const buf =
    typeof input === "string"
      ? Buffer.from(input)
      : input instanceof Uint8Array
        ? Buffer.from(input)
        : Buffer.from(new Uint8Array(input))
  return buf.toString("base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}

function pemToPkcs8Der(pem: string): Uint8Array<ArrayBuffer> {
  const body = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "")
  if (body.length === 0) {
    throw new OperationalError(
      `ASC private key at ${ASC_KEY_LOCAL_PATH} is empty or not PEM-encoded`
    )
  }
  const raw = Buffer.from(body, "base64")
  const der = new Uint8Array(raw.byteLength)
  der.set(raw)
  return der
}

export async function buildAscJwt(opts: {
  readonly pem: string
  readonly keyId: string
  readonly issuerId: string
  readonly nowSeconds: number
}): Promise<string> {
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToPkcs8Der(opts.pem),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  )
  const header = base64Url(JSON.stringify({ alg: "ES256", kid: opts.keyId, typ: "JWT" }))
  const payload = base64Url(
    JSON.stringify({
      iss: opts.issuerId,
      iat: opts.nowSeconds,
      exp: opts.nowSeconds + JWT_TTL_SECONDS,
      aud: "appstoreconnect-v1",
    })
  )
  const signingInput = `${header}.${payload}`
  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    new TextEncoder().encode(signingInput)
  )
  return `${signingInput}.${base64Url(signature)}`
}

export async function mintAscJwt(
  nowSeconds: number = Math.floor(Date.now() / 1000)
): Promise<string> {
  let pem: string
  try {
    pem = readFileSync(ASC_KEY_LOCAL_PATH, "utf8")
  } catch {
    throw new OperationalError(
      `App Store Connect private key not found at ${ASC_KEY_LOCAL_PATH} — the ASC .p8 (AuthKey_${ASC_KEY_ID}.p8) must be present on the workstation to poll TestFlight build processing state`
    )
  }
  return buildAscJwt({ pem, keyId: ASC_KEY_ID, issuerId: ASC_ISSUER_ID, nowSeconds })
}

export type AscJwtSource = () => Promise<string>

export function createAscJwtSource(opts?: {
  readonly mint?: (nowSeconds: number) => Promise<string>
  readonly nowSeconds?: () => number
}): AscJwtSource {
  const mint = opts?.mint ?? mintAscJwt
  const nowSeconds = opts?.nowSeconds ?? (() => Math.floor(Date.now() / 1000))
  let held: string | undefined
  let mintedAt = 0
  return async (): Promise<string> => {
    const at = nowSeconds()
    if (held === undefined || at - mintedAt >= JWT_TTL_SECONDS - JWT_REMINT_MARGIN_SECONDS) {
      held = await mint(at)
      mintedAt = at
    }
    return held
  }
}

const buildAttributesSchema = z
  .object({
    version: z.string(),
    processingState: z.string(),
    uploadedDate: z.string().nullish(),
  })
  .passthrough()

export const appsResponseSchema = z
  .object({
    data: z.array(z.object({ id: z.string() }).passthrough()),
  })
  .passthrough()

export const buildsResponseSchema = z
  .object({
    data: z.array(
      z.object({ id: z.string(), attributes: buildAttributesSchema.optional() }).passthrough()
    ),
  })
  .passthrough()

export const buildVersionsResponseSchema = z
  .object({
    data: z.array(
      z
        .object({
          id: z.string(),
          attributes: z.object({ version: z.string() }).passthrough().optional(),
        })
        .passthrough()
    ),
  })
  .passthrough()

export const buildBetaDetailResponseSchema = z
  .object({
    data: z
      .object({
        attributes: z.object({ internalBuildState: z.string().nullish() }).passthrough().optional(),
      })
      .passthrough(),
  })
  .passthrough()

export type AppsResponse = z.infer<typeof appsResponseSchema>
export type BuildsResponse = z.infer<typeof buildsResponseSchema>
export type BuildVersionsResponse = z.infer<typeof buildVersionsResponseSchema>
export type BuildBetaDetailResponse = z.infer<typeof buildBetaDetailResponseSchema>

export interface LatestBuild {
  readonly id: string
  readonly version: string
  readonly processingState: string
  readonly uploadedDate?: string
}

export function pickAppId(resp: AppsResponse): string | null {
  return resp.data[0]?.id ?? null
}

export function pickLatestBuild(resp: BuildsResponse): LatestBuild | null {
  const first = resp.data[0]
  if (!first?.attributes) return null
  return {
    id: first.id,
    version: first.attributes.version,
    processingState: first.attributes.processingState,
    uploadedDate: first.attributes.uploadedDate ?? undefined,
  }
}

export function pickMaxBuildVersion(resp: BuildVersionsResponse): number {
  let max = 0
  for (const b of resp.data) {
    const raw = b.attributes?.version
    if (raw === undefined) continue
    const n = Number.parseInt(raw.trim(), 10)
    if (Number.isFinite(n) && n > max) max = n
  }
  return max
}

export async function ascApiGet<T>(path: string, jwt: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${ASC_API_BASE}${path}`, { headers: { Authorization: `Bearer ${jwt}` } })
  if (res.status === 401 || res.status === 403) {
    throw new OperationalError(
      `App Store Connect API returned ${res.status} for GET ${path} — key ${ASC_KEY_ID} lacks access, or the JWT was rejected. Grant the key App Manager (or Admin) in App Store Connect → Users and Access → Integrations, then re-run.`
    )
  }
  if (!res.ok) {
    throw new OperationalError(`App Store Connect API GET ${path} failed with HTTP ${res.status}`)
  }
  return schema.parse(await res.json())
}

export async function resolveAppId(bundleId: string, jwt: string): Promise<string> {
  const resp = await ascApiGet(
    `/v1/apps?filter[bundleId]=${encodeURIComponent(bundleId)}&limit=1`,
    jwt,
    appsResponseSchema
  )
  const appId = pickAppId(resp)
  if (appId === null) {
    throw new OperationalError(
      `No App Store Connect app found for bundle id ${bundleId} — the app record must exist in App Store Connect (created once in the web UI) before its builds can be polled`
    )
  }
  return appId
}

export async function fetchLatestBuild(appId: string, jwt: string): Promise<LatestBuild | null> {
  const resp = await ascApiGet(
    `/v1/builds?filter[app]=${encodeURIComponent(appId)}&sort=-uploadedDate&limit=1&fields[builds]=version,processingState,uploadedDate`,
    jwt,
    buildsResponseSchema
  )
  return pickLatestBuild(resp)
}

export function pickInternalBuildState(resp: BuildBetaDetailResponse): string | null {
  return resp.data.attributes?.internalBuildState ?? null
}

export async function fetchInternalBuildState(
  buildId: string,
  jwt: string
): Promise<string | null> {
  const resp = await ascApiGet(
    `/v1/builds/${encodeURIComponent(buildId)}/buildBetaDetail`,
    jwt,
    buildBetaDetailResponseSchema
  )
  return pickInternalBuildState(resp)
}

export async function fetchMaxBuildVersion(appId: string, jwt: string): Promise<number> {
  const resp = await ascApiGet(
    `/v1/builds?filter[app]=${encodeURIComponent(appId)}&limit=200&fields[builds]=version`,
    jwt,
    buildVersionsResponseSchema
  )
  return pickMaxBuildVersion(resp)
}
