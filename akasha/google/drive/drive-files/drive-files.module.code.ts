import { InputError, OperationalError } from "@akasha/errors-core/exit-code"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import type { DriveClient } from "../drive-client/drive-client.module.code.ts"
import {
  type DriveFileMetadata,
  driveFileMetadataSchema,
} from "../drive-file-schema/drive-file-schema.module.code.ts"

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/
const PATH_ID_RE = /\/d\/([A-Za-z0-9_-]+)/
const PATH_ID_CAPTURE = z.tuple([z.string()])

export function parseDriveFileId(raw: string): string {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "")
  if (trimmed === "") throw new InputError("no Drive file URL or id provided")

  if (trimmed.includes("://")) {
    let url: URL
    try {
      url = new URL(trimmed)
    } catch {
      throw new InputError(`not a valid Drive URL or file id: ${raw}`)
    }
    const queryId = url.searchParams.get("id")
    if (queryId !== null && queryId !== "") return queryId
    if (PATH_ID_RE.test(url.pathname)) {
      const [id] = requireMatchPositional(PATH_ID_RE, PATH_ID_CAPTURE, url.pathname)
      return id
    }
    throw new InputError(`could not find a file id in Drive URL: ${raw}`)
  }

  if (DRIVE_ID_RE.test(trimmed)) return trimmed
  throw new InputError(`not a valid Drive URL or file id: ${raw}`)
}

export async function fetchFileMetadata(
  client: DriveClient,
  fileId: string
): Promise<DriveFileMetadata> {
  const res = await client.raw.files.get({ fileId, fields: "id,name,mimeType,size" })
  return driveFileMetadataSchema.parse(res.data)
}

export function isNativeGoogleDoc(mimeType: string | undefined): boolean {
  return mimeType?.startsWith("application/vnd.google-apps.") === true
}

export async function downloadFileBytes(client: DriveClient, fileId: string): Promise<Uint8Array> {
  const res = await client.raw.files.get({ fileId, alt: "media" }, { responseType: "arraybuffer" })
  const data = res.data
  if (!(data instanceof ArrayBuffer))
    throw new OperationalError(
      `Drive returned an unexpected body type for file ${fileId} (expected binary bytes)`
    )
  return new Uint8Array(data)
}
