import { join } from "node:path"
import { type AppCspConfig, buildSecurityHeaders } from "@shared/web-security-headers/build"
import { generateNonce } from "@shared/web-security-headers/nonce"
import { htmlCacheControl, serveClientStatic } from "@shared/web-static-assets/serve-static"
import type { ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"
import { z } from "zod"

declare module "react-router" {
  interface AppLoadContext {
    nonce?: string
  }
}

const ROOT = import.meta.dir
const BUILD_DIR = join(ROOT, "build")
const CLIENT_DIR = join(BUILD_DIR, "client")

function asServerBuild(value: unknown): ServerBuild {
  return value as ServerBuild
}

const serverBuild = asServerBuild(await import(join(BUILD_DIR, "server", "index.js")))

const handler = createRequestHandler(serverBuild, "production")

const CSP_CONFIG: AppCspConfig = {
  connectSrc: ["https://supabase.alanwalton.com", "wss://supabase.alanwalton.com"],
  mediaSrc: ["blob:"],
}

const PORT_SCHEMA = z.coerce.number().int().positive().max(65535).default(3000)
const HOST_SCHEMA = z.string().min(1).default("0.0.0.0")
const port = PORT_SCHEMA.parse(process.env["PORT"])
const hostname = HOST_SCHEMA.parse(process.env["HOST"])

Bun.serve({
  port,
  hostname,
  error(error: Error) {
    console.error("[alanwalton/web] fetch handler error:", error)
    return new Response("Internal Server Error", { status: 500 })
  },
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const pathname = url.pathname

    const host = url.hostname
    if (host === "idle.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/idle", 301)
    }
    if (host === "awen.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/games", 301)
    }
    if (host === "tower.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/game/the-tower-29644e7b", 302)
    }
    if (host === "dragons.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/game/dragons-dungeons-92c712df", 302)
    }

    const staticRes = await serveClientStatic(pathname, CLIENT_DIR)
    if (staticRes) return staticRes

    const nonce = generateNonce()
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

console.log(`[alanwalton/web] listening on http://${hostname}:${port}`)
