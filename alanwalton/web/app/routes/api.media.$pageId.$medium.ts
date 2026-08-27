import { serveMedia } from "@shared/pages-ui/media/serve-media"
import { capacitorCorsHeaders, withCors } from "~/lib/capacitor-cors"
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
  const response = await serveMedia(request, {
    pageId: params.pageId,
    medium: params.medium,
    variant: url.searchParams.get("variant"),
  })

  if (Object.keys(cors).length === 0) return response
  const headers = withCors(new Headers(response.headers), cors)
  return new Response(response.body, { status: response.status, headers })
}
