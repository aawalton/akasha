import type { Value } from "@akasha/pages-system/page-value"
import type { Row } from "@akasha/pages-system-service/asking"
import {
  askingFor,
  type Fetcher,
  type Sleeper,
  writingFor,
} from "@akasha/pages-system-service/calling"

export type ErrorCapturePayload = {
  fingerprint: string
  message: string
  stack: string
  kind: string
  app: string
  url: string
  userAgent: string
  releaseSha?: string
}

export type Captured = {
  readonly slug: string
  readonly commit: string | null
}

export const PAGE_TYPE = "error"

export const ERROR_CAPTURE_WRITER = "error capture <errors@alanwalton.com>"

export function slugFor(payload: ErrorCapturePayload): string {
  return `${payload.app}-${payload.fingerprint}`
}

export function firstValuesFor(payload: ErrorCapturePayload, at: string): Value {
  const held: Value = {
    pageTypeSlug: PAGE_TYPE,
    slug: slugFor(payload),
    fingerprint: payload.fingerprint,
    app: payload.app,
    kind: payload.kind,
    message: payload.message,
    userAgent: payload.userAgent,
    firstSeenAt: at,
    lastSeenAt: at,
    count: 1,
  }
  if (payload.url !== "") held.url = payload.url
  if (payload.releaseSha !== undefined) held.releaseSha = payload.releaseSha
  return held
}

export function againValuesFor(row: Row, at: string): Value {
  const held: Value = { ...row, lastSeenAt: at }
  const was = row.count
  if (typeof was === "number") held.count = was + 1
  else delete held.count
  return held
}

export async function captureError(
  payload: ErrorCapturePayload,
  writer: string = ERROR_CAPTURE_WRITER,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Captured> {
  const slug = slugFor(payload)
  const at = new Date().toISOString()
  const asked = await askingFor(
    { pageTypeSlug: PAGE_TYPE, where: { slug: { is: slug } }, limit: 1 },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    throw new Error(
      `captureError(${slug}): the pages would not say what is already filed under this fingerprint, so nothing was raised — ${asked.refused}`
    )
  }
  const row = asked.rows[0]
  const wrote = await writingFor(
    {
      writer,
      message: row === undefined ? `${slug} was met for the first time` : `${slug} was met again`,
      pages: [
        {
          pageTypeSlug: PAGE_TYPE,
          slug,
          values: row === undefined ? firstValuesFor(payload, at) : againValuesFor(row, at),
        },
      ],
    },
    fetcher,
    naps
  )
  if ("refused" in wrote) {
    throw new Error(
      `captureError(${slug}): the pages refused the write, so how often this has broken is unchanged — ${wrote.refused}`
    )
  }
  return { slug, commit: wrote.commit }
}
