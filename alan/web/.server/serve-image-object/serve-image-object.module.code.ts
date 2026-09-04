import { imageObjectReadKeys } from "@akasha/object-store/object-store-key"
import type { ObjectStore } from "@akasha/object-store/seaweedfs-store"

export interface ResolvedImage {
  readonly key: string
  readonly etag?: string
}

export function ifNoneMatchSatisfied(header: string | null, etag: string): boolean {
  if (header == null) return false
  return header.split(",").some((candidate) => candidate.trim() === etag)
}

export async function resolveServableImage(
  store: ObjectStore,
  pageId: string
): Promise<ResolvedImage | null> {
  for (const candidate of imageObjectReadKeys(pageId)) {
    const meta = await store.head(candidate)
    if (meta) return { key: candidate, etag: meta.etag }
  }
  return null
}

export interface ServeImageOptions {
  readonly headers: Headers
  readonly cacheControl: string
}

export async function serveResolvedImage(
  store: ObjectStore,
  resolved: ResolvedImage,
  request: Request,
  options: ServeImageOptions
): Promise<Response> {
  const { headers, cacheControl } = options
  headers.set("Cache-Control", cacheControl)
  if (resolved.etag != null) headers.set("ETag", resolved.etag)

  if (
    resolved.etag != null &&
    ifNoneMatchSatisfied(request.headers.get("If-None-Match"), resolved.etag)
  ) {
    return new Response(null, { status: 304, headers })
  }

  let bytes: Uint8Array
  try {
    bytes = await store.get(resolved.key)
  } catch {
    return new Response("Not Found", { status: 404, headers })
  }

  headers.set("Content-Type", "image/png")
  return new Response(new Uint8Array(bytes), { headers })
}
