// Every path under `/api/` that no route above it answers lands here, and gets a 404 naming the
// address that was asked for.
//
// Without this route, `/api/anything` fell to `route(":pageTypeSlug/:pageHrefParam")` in
// `app/routes.ts`, which reads `api` as a page type and the rest as a page. That route declares no
// `action`, so React Router raised its own error through `getInternalRouterError` before any module
// of ours ran, and the document render of that error answered 500. On 2026-09-02 Alan's health
// Shortcut posted to `/api/health-samples` — the ingest route is `/api/tracking/health-samples` —
// and the 500 sent three investigations at the site rather than at the address. A 500 says the site
// is broken. A 404 says that address does not exist. Only the second was true.
//
// Because the missing-`action` error is raised before any route module runs, a guard written inside
// `page-detail` could not have answered it. A route that declares an action is the only thing that
// can, which is why this file holds one.
//
// Ranking, not array position, is what keeps this out of the way. React Router scores `api/*` at 10
// — one static segment, less two for the splat — against 8 for `:pageTypeSlug/:pageHrefParam`, and
// the cheapest real `api/...` route scores 22. So it beats the page catch-all and loses to every
// declared api route, wherever in the array it is written.
//
// It never forwards a wrong address to a route of similar name. A caller with the wrong address is
// told so and fixes the address.

function noSuchRoute(request: Request): Response {
  const { pathname } = new URL(request.url)
  const method = request.method.toUpperCase()
  return Response.json(
    {
      error: "no-such-route",
      method,
      path: pathname,
      message: `No route under /api/ answers ${method} ${pathname}.`,
    },
    { status: 404, headers: { "Cache-Control": "no-store" } }
  )
}

export function loader({ request }: { request: Request }): Response {
  return noSuchRoute(request)
}

export function action({ request }: { request: Request }): Response {
  return noSuchRoute(request)
}
