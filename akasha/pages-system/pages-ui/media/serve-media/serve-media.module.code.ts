import { mediaRenderObjectKey } from "@akasha/object-store/object-store-key"
import {
  type ObjectStreamResult,
  seaweedFSObjectStoreFromEnv,
} from "@akasha/object-store/seaweedfs-store"
import { getPage } from "@akasha/pages-access/get"
import { getMediaPageTypeSlugs } from "@akasha/pages-access/page-type-config"
import { isMedium, MEDIA_FORMATS } from "@akasha/pages-core/media-formats"
import { mediaTokenSecret, verifyMediaToken } from "@akasha/pages-ui/media/media-token"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

export const MEDIA_RANGE_CAP_BYTES = 8 * 1024 * 1024
export const MEDIA_VARIANT_PATTERN = /^[a-z0-9-]+$/i

const SINGLE_BYTE_RANGE_PATTERN = /^bytes=(\d+)-(\d*)$/
const RANGE_CAPTURES = z.tuple([z.coerce.number().int().nonnegative(), z.string()])

export type ServeMediaParams = {
  pageId: string
  medium: string
  variant: string | null
}

export type MediaReader = {
  user: { id: string } | null
  headers: Headers
}

export type ReadMediaReader = (request: Request) => Promise<MediaReader>

function rangeParts(rangeHeader: string): readonly [number, string] | null {
  try {
    return requireMatchPositional(SINGLE_BYTE_RANGE_PATTERN, RANGE_CAPTURES, rangeHeader.trim())
  } catch {
    return null
  }
}

export function capMediaRange(rangeHeader: string, cap: number): string {
  const parts = rangeParts(rangeHeader)
  if (parts === null) return rangeHeader
  const [start, endStr] = parts
  const cappedEnd = start + cap - 1
  const clientEnd = endStr === "" ? null : Number.parseInt(endStr, 10)
  const end = clientEnd == null ? cappedEnd : Math.min(clientEnd, cappedEnd)
  return `bytes=${start}-${end}`
}

export function mediaRangeStart(rangeHeader: string | null): number {
  if (rangeHeader == null) return 0
  const parts = rangeParts(rangeHeader)
  return parts === null ? 0 : parts[0]
}

export async function mediaPageExists(pageId: string): Promise<boolean> {
  for (const pageTypeSlug of await getMediaPageTypeSlugs()) {
    const found = await getPage({
      pageTypeSlug,
      where: [{ key: "id", eq: pageId }],
      select: ["id"],
    })
    if (found !== null) return true
  }
  return false
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

export async function serveMedia(
  request: Request,
  params: ServeMediaParams,
  readMediaReader: ReadMediaReader
): Promise<Response> {
  const { pageId, medium, variant } = params
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
    const reader = await readMediaReader(request)
    headers = reader.headers
    if (reader.user === null) return new Response("Unauthorized", { status: 401, headers })
    if (!(await mediaPageExists(pageId))) {
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
