import { join } from "node:path"
import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import {
  formatWatermark,
  observeRss,
  RSS_SAMPLE_INTERVAL_MS,
} from "akasha/alan/atlas-web/modules/memory-watch/memory-watch.module.code.ts"
import {
  formatArrival,
  formatCompletion,
} from "akasha/alan/atlas-web/modules/request-log/request-log.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import {
  type RouterAppServing,
  servedBy,
} from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import type { ServerBuild } from "react-router"
import { createRequestHandler } from "react-router"
import { z } from "zod"
import "akasha/design/language/lua-compiler/performance-global/performance-global.type-declaration.d.ts"

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

const SERVING: RouterAppServing = {
  clientDir: CLIENT_DIR,
  csp: {
    connectSrc: ["https://protomaps.github.io"],
    imgSrc: ["blob:", "https://protomaps.github.io"],
    workerSrc: ["blob:"],
  },
  whoIsReading: handoverReader(ATLAS_SITE),
  routes: createRequestHandler(serverBuild, "production"),
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

function respond(request: Request, pathname: string): Promise<Response> {
  return servedBy(SERVING, request, pathname)
}

let rssWatermark = 0
setInterval(() => {
  const decision = observeRss(process.memoryUsage.rss(), rssWatermark)
  rssWatermark = decision.watermark
  if (decision.report) console.log(formatWatermark(decision.watermark))
}, RSS_SAMPLE_INTERVAL_MS).unref()

console.log(`[atlas/web] listening on http://${hostname}:${port}`)
