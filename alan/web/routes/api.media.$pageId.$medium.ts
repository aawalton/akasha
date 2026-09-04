import { serveMedia } from "@akasha/pages-ui/media/serve-media"
import { resolveRequestUser } from "@akasha/supabase-rr/auth-server"
import { capacitorCorsHeaders, withCors } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { MEDIA_UUID_PATTERN } from "../media-page/media-page.module.code.ts"
import type { Route } from "./+types/api.media.$pageId.$medium"

const DOWNLOAD_CORS = {
  allowHeaders: "Authorization, Range",
  exposeHeaders: "Content-Range, ETag, Content-Length, Accept-Ranges",
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, "GET, OPTIONS", DOWNLOAD_CORS)

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: withCors(new Headers(), cors) })
  }

  const url = new URL(request.url)
  const response = MEDIA_UUID_PATTERN.test(params.pageId)
    ? await serveMedia(
        request,
        {
          pageId: params.pageId,
          medium: params.medium,
          variant: url.searchParams.get("variant"),
        },
        resolveRequestUser
      )
    : new Response("Not Found", { status: 404 })

  if (Object.keys(cors).length === 0) return response
  const headers = withCors(new Headers(response.headers), cors)
  return new Response(response.body, { status: response.status, headers })
}
