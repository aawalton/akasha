import type { PoolService } from "../pool-config/pool-config.module.code.ts"

function upstreamUrl(internalPort: number, pathname: string, search: string): string {
  return `http://127.0.0.1:${internalPort}${pathname}${search}`
}

export async function proxyToService(service: PoolService, request: Request): Promise<Response> {
  const url = new URL(request.url)
  const target = upstreamUrl(service.internalPort, url.pathname, url.search)

  const headers = new Headers(request.headers)
  headers.delete("host")

  const hasBody = request.body !== null
  const init: RequestInit & { duplex?: "half"; timeout?: boolean } = {
    method: request.method,
    headers,
    timeout: false,
    ...(hasBody ? { body: request.body, duplex: "half" } : {}),
  }

  let upstream: Response
  try {
    upstream = await fetch(target, init)
  } catch (err) {
    return new Response(`[traffic-cop] upstream ${service.name} fetch failed: ${String(err)}\n`, {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: upstream.headers,
  })
}
