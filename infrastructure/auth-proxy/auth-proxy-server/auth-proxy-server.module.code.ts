import type { Server } from "bun"

import { CONFIG } from "../auth-proxy-config/auth-proxy-config.module.code.ts"
import { applyCorsHeaders, buildPreflightResponse } from "../cors/cors.module.code.ts"
import { passthroughRequest, proxyRequest } from "../proxy/proxy.module.code.ts"
import { buildStubResponse, fetchOrBadGateway } from "../proxy-core/proxy-core.module.code.ts"
import { validateSession } from "../session-identity/session-identity.module.code.ts"
import {
  buildTargetUrl,
  closeOutbound,
  forwardToOutbound,
  openOutbound,
  type WsBridgeData,
} from "../ws-bridge/ws-bridge.module.code.ts"

async function handler(req: Request, server: Server<WsBridgeData>): Promise<Response | undefined> {
  const url = new URL(req.url)

  if (url.pathname === "/healthz") {
    return new Response("OK", { status: 200 })
  }

  const host = req.headers.get("host")
  if (host == null) {
    return new Response("Missing Host header", { status: 400 })
  }

  const pathRoute = CONFIG.PATH_ROUTES.find(
    (r) => r.host === host && url.pathname.startsWith(r.prefix)
  )
  if (pathRoute) {
    const corsEnabled = CONFIG.CORS_PATH_PREFIXES.includes(pathRoute.prefix)
    if (corsEnabled && req.method === "OPTIONS") {
      return buildPreflightResponse(req)
    }

    if (pathRoute.stub) {
      const resp = buildStubResponse(pathRoute.stub.body)
      return corsEnabled ? applyCorsHeaders(resp, req) : resp
    }

    if (pathRoute.websocket) {
      const upgrade = req.headers.get("upgrade")
      if (upgrade?.toLowerCase() === "websocket") {
        const targetUrl = buildTargetUrl(
          req,
          pathRoute.target,
          pathRoute.stripPrefix ? pathRoute.prefix : undefined
        )
        const data: WsBridgeData = {
          targetUrl,
          outbound: null,
          outboundOpen: false,
          buffer: [],
        }
        const upgraded = server.upgrade(req, { data })
        if (upgraded) {
          return undefined
        }
        return new Response("WebSocket upgrade failed", { status: 400 })
      }
      const diag = {
        method: req.method,
        path: url.pathname,
        host,
        upgrade: upgrade ?? null,
        connection: req.headers.get("connection") ?? null,
        secWebsocketKey: req.headers.get("sec-websocket-key") ?? null,
        secWebsocketVersion: req.headers.get("sec-websocket-version") ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      }
      console.error(`ws-route hit without upgrade header: ${JSON.stringify(diag)}`)
      return new Response(
        `WebSocket upgrade required for ${pathRoute.prefix} — received ${JSON.stringify(diag)}`,
        { status: 400 }
      )
    }
    const resp = await fetchOrBadGateway(
      () =>
        passthroughRequest(
          req,
          pathRoute.target,
          pathRoute.stripPrefix ? pathRoute.prefix : undefined
        ),
      (err) =>
        console.error(
          `passthrough upstream fetch failed for ${host}${url.pathname}: ${
            err instanceof Error ? err.message : String(err)
          }`
        )
    )
    return corsEnabled ? applyCorsHeaders(resp, req) : resp
  }

  const route = CONFIG.ROUTE_MAP[host]
  if (route == null) {
    return new Response("Not Found", { status: 404 })
  }

  if (req.headers.has("authorization")) {
    return passthroughRequest(req, route.target, undefined, route.proxy)
  }

  const cookieHeader = req.headers.get("cookie") ?? ""
  const identity = await validateSession(cookieHeader)
  if (identity == null) {
    return denyUnauthenticated(req)
  }

  return proxyRequest(req, route.target, identity, route.proxy)
}

function denyUnauthenticated(req: Request): Response {
  const accept = req.headers.get("accept") ?? ""
  const ua = req.headers.get("user-agent") ?? ""
  const isBrowser = accept.includes("text/html") && !ua.startsWith("git/")

  if (isBrowser) {
    const host = req.headers.get("host")
    const url = new URL(req.url)
    const next = host != null ? `https://${host}${url.pathname}${url.search}` : req.url
    const location = `${CONFIG.SIGN_IN_URL}?next=${encodeURIComponent(next)}`
    return new Response(null, {
      status: 302,
      headers: { Location: location },
    })
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="auth-proxy"' },
  })
}

Bun.serve<WsBridgeData>({
  port: CONFIG.PORT,
  idleTimeout: 60,
  fetch: handler,
  error(err) {
    console.error(
      `auth-proxy unhandled request error: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`
    )
    return new Response("Internal Server Error", { status: 500 })
  },
  websocket: {
    open(ws) {
      openOutbound(ws)
    },
    message(ws, message) {
      forwardToOutbound(ws, message)
    },
    close(ws) {
      closeOutbound(ws)
    },
  },
})

console.log(`auth-proxy listening on :${CONFIG.PORT}`)
