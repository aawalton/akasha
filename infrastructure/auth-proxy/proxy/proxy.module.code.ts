import type { Identity } from "../session-identity/session-identity.module.code.ts"

export async function proxyRequest(
  req: Request,
  target: string,
  identity: Identity,
  proxy?: string
): Promise<Response> {
  const url = new URL(req.url)
  const targetUrl = new URL(url.pathname + url.search, target)

  const headers = new Headers(req.headers)
  headers.set("X-Forwarded-User", identity.sub)
  headers.set("X-Forwarded-Email", identity.email)
  headers.set("X-Forwarded-Name", identity.name)

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
  stripPrefix?: string,
  proxy?: string
): Promise<Response> {
  if (target.startsWith("ws://") || target.startsWith("wss://")) {
    throw new Error(
      `passthroughRequest refuses ws target ${target} — this path must be handled by the WebSocket bridge`
    )
  }

  const url = new URL(req.url)
  const pathname =
    stripPrefix != null && url.pathname.startsWith(stripPrefix)
      ? url.pathname.slice(stripPrefix.length) !== ""
        ? url.pathname.slice(stripPrefix.length)
        : "/"
      : url.pathname
  const targetUrl = new URL(pathname + url.search, target)

  return await fetch(targetUrl.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    redirect: "manual",
    decompress: false,
    ...(proxy != null ? { proxy } : {}),
  })
}
