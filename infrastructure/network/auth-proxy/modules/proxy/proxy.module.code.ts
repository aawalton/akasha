import type { Caller } from "akasha/infrastructure/network/auth-proxy/modules/config/auth-proxy-config.module.code.ts"

export async function proxyRequest(
  req: Request,
  target: string,
  caller: Caller,
  proxy?: string
): Promise<Response> {
  const url = new URL(req.url)
  const targetUrl = new URL(url.pathname + url.search, target)

  const headers = new Headers(req.headers)
  headers.set("X-Forwarded-User", caller.sub)
  headers.set("X-Forwarded-Email", caller.email)
  headers.set("X-Forwarded-Name", caller.name)

  return await fetch(targetUrl.toString(), {
    method: req.method,
    headers,
    body: req.body,
    redirect: "manual",
    decompress: false,
    ...(proxy != null ? { proxy } : {}),
  })
}

export async function passthroughRequest(
  req: Request,
  target: string,
  proxy?: string
): Promise<Response> {
  const url = new URL(req.url)
  const targetUrl = new URL(url.pathname + url.search, target)

  return await fetch(targetUrl.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    redirect: "manual",
    decompress: false,
    ...(proxy != null ? { proxy } : {}),
  })
}
