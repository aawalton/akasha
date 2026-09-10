import { resolveMediaPage } from "../../media-page/media-page.module.code.ts"
import { resolveMediaVariants } from "../../media-variants/media-variants.module.code.ts"

const SHELL_ORIGINS: readonly string[] = ["https://alanwalton.com", "capacitor://localhost"]

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin")
  return origin !== null && SHELL_ORIGINS.includes(origin)
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        Vary: "Origin",
      }
    : {}
}

export async function loader({
  params,
  request,
}: {
  params: { pageId: string }
  request: Request
}): Promise<Response> {
  const cors = corsHeaders(request)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  const found = await resolveMediaPage(params.pageId)
  if (found === null) {
    return Response.json({ error: "Page not found." }, { status: 404, headers: cors })
  }
  const { variants, defaultVariant } = await resolveMediaVariants({ page: found.page })
  return Response.json({ variants, defaultVariant }, { headers: cors })
}
