import { lowerUuid } from "@akasha/pages/name-format/lower-uuid"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"
import {
  resolveServableImage,
  serveResolvedImage,
} from "../../.server/serve-image-object/serve-image-object.module.code.ts"

export async function loader({
  params,
  request,
}: {
  params: { imageId: string }
  request: Request
}): Promise<Response> {
  const { user, headers } = await getUser(request)
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
