import { getPage } from "@shared/pages-access/get"
import { resolveMediaVariants } from "~/lib/media-variants"
import type { Route } from "./+types/api.media.$pageId.variants"

const CAPACITOR_ORIGIN = "capacitor://localhost"

function corsHeaders(request: Request): Record<string, string> {
  return request.headers.get("Origin") === CAPACITOR_ORIGIN
    ? {
        "Access-Control-Allow-Origin": CAPACITOR_ORIGIN,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  const page = await getPage({ where: [{ key: "id", eq: params.pageId }] })
  if (page === null) {
    return Response.json({ error: "Page not found." }, { status: 404, headers: cors })
  }
  const { variants, defaultVariant } = await resolveMediaVariants({ page })
  return Response.json({ variants, defaultVariant }, { headers: cors })
}
