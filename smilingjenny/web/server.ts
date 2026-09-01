import { join } from "node:path"
import { randomId } from "@akasha/id-minting"
import { holdDerivers } from "@shared/pages-query/hold"
import { type AppCspConfig, buildSecurityHeaders } from "@akasha/web-security-headers/security-headers"
import { htmlCacheControl, serveClientStatic } from "@akasha/web-static-assets/serve-static"
import type { ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"
import { z } from "zod"

declare module "react-router" {
  interface AppLoadContext {
    nonce?: string
  }
}

const DERIVER_HOLD_MS = 5000

const ROOT = import.meta.dir
const BUILD_DIR = join(ROOT, "build")
const CLIENT_DIR = join(BUILD_DIR, "client")

function asServerBuild(value: unknown): ServerBuild {
  return value as ServerBuild
}

const serverBuild = asServerBuild(await import(join(BUILD_DIR, "server", "index.js")))

const handler = createRequestHandler(serverBuild, "production")

const CSP_CONFIG: AppCspConfig = {
  connectSrc: ["https://supabase.alanwalton.com"],
}

// This site queries pages the same way Alan's does, so it pays the same cost: each page
// type asks whether it is answered from the checkout, and that question rebuilds a key
// costing about 250ms of synchronous git no `await` can yield out of. Alan's server holds
// the derivation for a bounded window for this reason; this one did not, and was spared
// only by having less traffic. The window is what a page written here may take to be seen.
holdDerivers(DERIVER_HOLD_MS)

const PORT_SCHEMA = z.coerce.number().int().positive().max(65535).default(3000)
const HOST_SCHEMA = z.string().min(1).default("0.0.0.0")
const port = PORT_SCHEMA.parse(process.env["PORT"])
const hostname = HOST_SCHEMA.parse(process.env["HOST"])

Bun.serve({
  port,
  hostname,
  error(error: Error) {
    console.error("[smilingjenny/web] fetch handler error:", error)
    return new Response("Internal Server Error", { status: 500 })
  },
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    const staticRes = await serveClientStatic(pathname, CLIENT_DIR)
    if (staticRes) return staticRes

    const nonce = randomId()
    const resp = await handler(request, { nonce })
    const contentType = resp.headers.get("content-type") ?? ""
    if (contentType.startsWith("text/html")) {
      const newHeaders = new Headers(resp.headers)
      for (const [name, value] of Object.entries(buildSecurityHeaders(CSP_CONFIG, nonce))) {
        newHeaders.set(name, value)
      }
      newHeaders.set("Cache-Control", htmlCacheControl(newHeaders.get("cache-control")))
      return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: newHeaders,
      })
    }
    return resp
  },
})

console.log(`[smilingjenny/web] listening on http://${hostname}:${port}`)
