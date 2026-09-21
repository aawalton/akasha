import { join } from "node:path"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import {
  type RouterAppServing,
  servedBy,
} from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
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

const SERVING: RouterAppServing = {
  clientDir: CLIENT_DIR,
  csp: {},
  whoIsReading: handoverReader(REQUESTS_SITE),
  routes: createRequestHandler(serverBuild, "production"),
}

const PORT_SCHEMA = z.coerce.number().int().positive().max(65535).default(3000)
const HOST_SCHEMA = z.string().min(1).default("0.0.0.0")
const port = PORT_SCHEMA.parse(process.env["PORT"])
const hostname = HOST_SCHEMA.parse(process.env["HOST"])

const MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024

Bun.serve({
  port,
  hostname,
  maxRequestBodySize: MAX_REQUEST_BODY_BYTES,
  error(error: Error) {
    console.error("[requests/web] fetch handler error:", error)
    return new Response("Internal Server Error", { status: 500 })
  },
  async fetch(request: Request): Promise<Response> {
    return servedBy(SERVING, request, new URL(request.url).pathname)
  },
})

console.log(`[requests/web] listening on http://${hostname}:${port}`)
