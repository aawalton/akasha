import { join } from "node:path"
import { randomId } from "@akasha/id-minting"
import {
  type AppCspConfig,
  buildSecurityHeaders,
} from "@akasha/web-security-headers/security-headers"
import { htmlCacheControl, serveClientStatic } from "@akasha/web-static-assets/serve-static"
import type { ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"
import { z } from "zod"
import {
  formatWatermark,
  observeRss,
  RSS_SAMPLE_INTERVAL_MS,
} from "./memory-watch/memory-watch.module.code.ts"
import { formatArrival, formatCompletion } from "./request-log/request-log.module.code.ts"

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
  connectSrc: [
    "https://supabase.alanwalton.com",
    "wss://supabase.alanwalton.com",
    "https://protomaps.github.io",
  ],
  imgSrc: ["blob:", "https://protomaps.github.io"],
  workerSrc: ["blob:"],
}

const PORT_SCHEMA = z.coerce.number().int().positive().max(65535).default(3000)
const HOST_SCHEMA = z.string().min(1).default("0.0.0.0")
const port = PORT_SCHEMA.parse(process.env["PORT"])
const hostname = HOST_SCHEMA.parse(process.env["HOST"])

const MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024

let requestSeq = 0

Bun.serve({
  port,
  hostname,
  maxRequestBodySize: MAX_REQUEST_BODY_BYTES,
  error(error: Error) {
    console.error("[atlas/web] fetch handler error:", error)
    return new Response("Internal Server Error", { status: 500 })
  },
  async fetch(request: Request): Promise<Response> {
    requestSeq += 1
    const seq = requestSeq
    const pathname = new URL(request.url).pathname
    const startedAt = performance.now()
    console.log(
      formatArrival({
        seq,
        method: request.method,
        path: pathname,
        range: request.headers.get("Range"),
        contentLength: request.headers.get("Content-Length"),
        userAgent: request.headers.get("User-Agent"),
        rssBytes: process.memoryUsage.rss(),
      })
    )
    const response = await respond(request, pathname)
    console.log(
      formatCompletion({
        seq,
        method: request.method,
        path: pathname,
        status: response.status,
        durationMs: performance.now() - startedAt,
        rssBytes: process.memoryUsage.rss(),
      })
    )
    return response
  },
})

async function respond(request: Request, pathname: string): Promise<Response> {
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
}

let rssWatermark = 0
setInterval(() => {
  const decision = observeRss(process.memoryUsage.rss(), rssWatermark)
  rssWatermark = decision.watermark
  if (decision.report) console.log(formatWatermark(decision.watermark))
}, RSS_SAMPLE_INTERVAL_MS).unref()

console.log(`[atlas/web] listening on http://${hostname}:${port}`)
