import {
  landFromHandover,
  signInAt,
} from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import type { HandoverSite } from "akasha/alan/harness/handover-rr/modules/handover-site/handover-site.module.code.ts"
import { CONFIG } from "akasha/infrastructure/network/auth-proxy/modules/config/auth-proxy-config.module.code.ts"
import {
  passthroughRequest,
  proxyRequest,
} from "akasha/infrastructure/network/auth-proxy/modules/proxy/proxy.module.code.ts"
import {
  admissionOf,
  siteForHost,
} from "akasha/infrastructure/network/auth-proxy/modules/proxy-reading/proxy-reading.module.code.ts"

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)

  if (url.pathname === "/healthz") {
    return new Response("OK", { status: 200 })
  }

  const host = req.headers.get("host")
  if (host == null) {
    return new Response("Missing Host header", { status: 400 })
  }

  const route = CONFIG.ROUTE_MAP[host]
  if (route == null) {
    return new Response("Not Found", { status: 404 })
  }

  if (req.headers.has("authorization")) {
    return passthroughRequest(req, route.target, route.proxy)
  }

  const site = siteForHost(host)
  if (site === null) {
    return new Response("Not Found", { status: 404 })
  }

  if (url.pathname === site.landingPath) {
    return await landFromHandover(site, req)
  }

  const admission = await admissionOf(site, req)
  if (!admission.admitted) {
    return admission.aStranger ? denyUnauthenticated(req, site) : denyStranger()
  }

  return proxyRequest(req, route.target, admission.caller, route.proxy)
}

const NOT_YOURS = "You are signed in, and this is not yours to reach."

function denyStranger(): Response {
  return new Response(NOT_YOURS, {
    status: 403,
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
}

function denyUnauthenticated(req: Request, site: HandoverSite): Response {
  const accept = req.headers.get("accept") ?? ""
  const ua = req.headers.get("user-agent") ?? ""
  const isBrowser = accept.includes("text/html") && !ua.startsWith("git/")

  if (isBrowser) {
    return new Response(null, {
      status: 302,
      headers: { Location: signInAt(site, req) },
    })
  }

  return new Response("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="auth-proxy"' },
  })
}

Bun.serve({
  port: CONFIG.PORT,
  idleTimeout: 60,
  fetch: handler,
  error(err) {
    console.error(
      `auth-proxy unhandled request error: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`
    )
    return new Response("Internal Server Error", { status: 500 })
  },
})

console.log(`auth-proxy listening on :${CONFIG.PORT}`)
