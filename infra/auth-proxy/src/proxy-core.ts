export function buildStubResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

export function buildBadGatewayResponse(): Response {
  return new Response("Bad Gateway", { status: 502 })
}

export async function fetchOrBadGateway(
  doFetch: () => Promise<Response>,
  onError: (err: unknown) => void
): Promise<Response> {
  try {
    return await doFetch()
  } catch (err) {
    onError(err)
    return buildBadGatewayResponse()
  }
}
