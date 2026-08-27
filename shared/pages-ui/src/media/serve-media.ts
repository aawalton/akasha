import { type ObjectStreamResult, seaweedFSObjectStoreFromEnv } from "@shared/object-store"
import { mediaRenderObjectKey } from "@shared/object-store/keys"
import { type GetPageArgs, getPage } from "@shared/pages-access/get"
import { type Page } from "@shared/pages-core/page-types"
import { isMedium, MEDIA_FORMATS, type Medium } from "@shared/pages-core/media-formats"
import { resolveRequestUser } from "@shared/supabase-rr/auth/server"
import { requireMatchPositional } from "../../../utils-narrow/src/require-match-positional"
import { z } from "zod"
import { mediaTokenSecret, verifyMediaToken } from "./media-token"

export const MEDIA_RANGE_CAP_BYTES = 8 * 1024 * 1024

const SINGLE_BYTE_RANGE_PATTERN = /^bytes=(\d+)-(\d*)$/
const RANGE_CAPTURES_SCHEMA = z.tuple([z.coerce.number().int().nonnegative(), z.string()])

export function capMediaRange(rangeHeader: string, cap: number): string {
  let start: number
  let endStr: string
  try {
    ;[start, endStr] = requireMatchPositional(
      SINGLE_BYTE_RANGE_PATTERN,
      RANGE_CAPTURES_SCHEMA,
      rangeHeader.trim()
    )
  } catch {
    return rangeHeader
  }
  const cappedEnd = start + cap - 1
  const clientEnd = endStr === "" ? null : Number.parseInt(endStr, 10)
  const end = clientEnd == null ? cappedEnd : Math.min(clientEnd, cappedEnd)
  return `bytes=${start}-${end}`
}

export function mediaRangeStart(rangeHeader: string | null): number {
  if (rangeHeader == null) return 0
  try {
    const [start] = requireMatchPositional(
      SINGLE_BYTE_RANGE_PATTERN,
      RANGE_CAPTURES_SCHEMA,
      rangeHeader.trim()
    )
    return start
  } catch {
    return 0
  }
}

export const MEDIA_UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const MEDIA_VARIANT_PATTERN = /^[a-z0-9-]+$/i

export type ServeMediaParams = {
  pageId: string
  medium: string
  variant: string | null
}

export type PageLookup = (args: GetPageArgs) => Promise<Page | null>

export async function mediaPageStands(
  pageId: string,
  medium: Medium,
  look: PageLookup = getPage
): Promise<boolean> {
  const where = [{ key: "id", eq: pageId }] as const
  const asMedium = await look({ pageTypeSlug: medium, where: [...where], select: ["id"] })
  if (asMedium !== null) return true
  return (await look({ where: [...where], select: ["id"] })) !== null
}

export async function serveMedia(request: Request, params: ServeMediaParams): Promise<Response> {
  const { pageId, medium, variant } = params
  if (!MEDIA_UUID_PATTERN.test(pageId)) return new Response("Not Found", { status: 404 })
  if (!isMedium(medium)) return new Response("Not Found", { status: 404 })
  if (variant == null || !MEDIA_VARIANT_PATTERN.test(variant)) {
    return new Response("Not Found", { status: 404 })
  }

  const token = new URL(request.url).searchParams.get("token")
  let headers: Headers
  if (token != null) {
    if (!verifyMediaToken(token, { pageId, medium, variant }, mediaTokenSecret())) {
      return new Response("Unauthorized", { status: 401 })
    }
    headers = new Headers()
  } else {
    const { user, headers: authHeaders } = await resolveRequestUser(request)
    if (!user) return new Response("Unauthorized", { status: 401, headers: authHeaders })
    headers = authHeaders
    if (!(await mediaPageStands(pageId, medium))) {
      return new Response("Not Found", { status: 404, headers })
    }
  }

  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return new Response("Object store unavailable", { status: 503, headers })

  const format = MEDIA_FORMATS[medium]
  const key = mediaRenderObjectKey(pageId, medium, variant, format.ext)

  const rangeHeader = request.headers.get("Range")

  if (rangeHeader == null) {
    const meta = await store.head(key)
    if (meta == null) return new Response("Not Found", { status: 404, headers })
    if (meta.size > MEDIA_RANGE_CAP_BYTES) {
      headers.set("Accept-Ranges", "bytes")
      headers.set("Content-Range", `bytes */${meta.size}`)
      if (meta.etag != null) headers.set("ETag", meta.etag)
      return new Response("Range Not Satisfiable", { status: 416, headers })
    }
    let whole: ObjectStreamResult | null
    try {
      whole = await store.getStream(key, { range: null })
    } catch {
      return new Response("Not Found", { status: 404, headers })
    }
    if (!whole) return new Response("Not Found", { status: 404, headers })
    return buildMediaStreamResponse(whole, format.contentType, headers)
  }

  const effectiveRange = capMediaRange(rangeHeader, MEDIA_RANGE_CAP_BYTES)
  let stream: ObjectStreamResult | null
  try {
    stream = await store.getStream(key, { range: effectiveRange })
  } catch {
    return new Response("Not Found", { status: 404, headers })
  }
  if (!stream) return new Response("Not Found", { status: 404, headers })

  const ifRange = request.headers.get("If-Range")
  if (
    ifRange != null &&
    stream.etag != null &&
    ifRange !== stream.etag &&
    mediaRangeStart(rangeHeader) > 0
  ) {
    try {
      const restart = await store.getStream(key, {
        range: `bytes=0-${MEDIA_RANGE_CAP_BYTES - 1}`,
      })
      if (restart) stream = restart
    } catch {}
  }

  return buildMediaStreamResponse(stream, format.contentType, headers)
}

export function buildMediaStreamResponse(
  stream: ObjectStreamResult,
  contentType: string,
  headers: Headers
): Response {
  headers.set("Content-Type", contentType)
  headers.set("Cache-Control", "private, no-cache")
  headers.set("Accept-Ranges", "bytes")
  if (stream.contentLength != null) headers.set("Content-Length", String(stream.contentLength))
  if (stream.contentRange != null) headers.set("Content-Range", stream.contentRange)
  if (stream.etag != null) headers.set("ETag", stream.etag)
  return new Response(stream.body, { status: stream.status, headers })
}
