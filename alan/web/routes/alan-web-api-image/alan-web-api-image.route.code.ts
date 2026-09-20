import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import {
  resolveServableImage,
  serveResolvedImage,
} from "akasha/alan/web/.server/serve-image-object/serve-image-object.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/modules/seaweedfs-store/seaweedfs-store.module.code.ts"
import { lowerUuid } from "akasha/page/name-format/pages/lower-uuid/lower-uuid.name-format.code.ts"

export async function loader({
  params,
  request,
}: {
  params: { imageId: string }
  request: Request
}): Promise<Response> {
  const { user, headers } = await readAlanUser(request)
  if (!user) return new Response("Unauthorized", { status: 401, headers })

  const imageId = params.imageId
  if (!lowerUuid(imageId.toLowerCase())) return new Response("Not Found", { status: 404, headers })

  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return new Response("Object store unavailable", { status: 503, headers })

  const resolved = await resolveServableImage(store, imageId)
  if (resolved === null) return new Response("Not Found", { status: 404, headers })
  return serveResolvedImage(store, resolved, request, {
    headers,
    cacheControl: "private, max-age=300, must-revalidate",
  })
}
