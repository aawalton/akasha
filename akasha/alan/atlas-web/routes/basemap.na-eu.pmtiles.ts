import { seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { checkBasemapRange, MAX_RANGE_BYTES } from "../basemap-range/basemap-range.module.code.ts"
import type { Route } from "./+types/basemap.na-eu.pmtiles"

const OBJECT_KEY = "na-eu.pmtiles"

const REFUSAL_HEADERS = { "Accept-Ranges": "bytes", "Cache-Control": "no-store" }

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return new Response("basemap object store unavailable", { status: 503 })

  const verdict = checkBasemapRange(request.headers.get("Range"))
  if (!verdict.ok) {
    return new Response(verdict.message, { status: verdict.status, headers: REFUSAL_HEADERS })
  }

  const result = await store.getStream(OBJECT_KEY, { range: verdict.range })
  if (!result) return new Response("basemap not found", { status: 404 })

  if (result.status !== 206) {
    await result.body?.cancel().catch(() => {})
    return new Response(`basemap range not honored (gateway status ${result.status})`, {
      status: 502,
      headers: REFUSAL_HEADERS,
    })
  }

  if (result.contentLength !== null && result.contentLength > MAX_RANGE_BYTES) {
    await result.body?.cancel().catch(() => {})
    return new Response("basemap range exceeds the per-request cap", {
      status: 502,
      headers: REFUSAL_HEADERS,
    })
  }

  const headers = new Headers({
    "Content-Type": "application/octet-stream",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  })
  if (result.contentLength !== null) headers.set("Content-Length", String(result.contentLength))
  if (result.contentRange !== null) headers.set("Content-Range", result.contentRange)

  return new Response(result.body, { status: result.status, headers })
}
