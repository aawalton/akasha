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
