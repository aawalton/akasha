import { seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { getUser } from "@akasha/supabase-rr/auth-server"
import {
  resolveServableImage,
  serveResolvedImage,
} from "../.server/serve-image-object/serve-image-object.module.code.ts"
import type { Route } from "./+types/api.image.$imageId"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (!user) return new Response("Unauthorized", { status: 401, headers })

  const imageId = params.imageId
  if (!UUID_PATTERN.test(imageId)) return new Response("Not Found", { status: 404, headers })

  const store = seaweedFSObjectStoreFromEnv()
  if (!store) return new Response("Object store unavailable", { status: 503, headers })

  const resolved = await resolveServableImage(store, imageId)
  if (resolved === null) return new Response("Not Found", { status: 404, headers })
  return serveResolvedImage(store, resolved, request, {
    headers,
    cacheControl: "private, max-age=300, must-revalidate",
  })
}
