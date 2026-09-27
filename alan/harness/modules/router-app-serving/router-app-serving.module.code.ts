import { join } from "node:path"
import {
  readingFor,
  type WhoIsReading,
} from "akasha/alan/harness/modules/reading-in-flight/reading-in-flight.module.code.ts"
import {
  type AppCspConfig,
  buildSecurityHeaders,
} from "akasha/alan/harness/modules/security-headers/security-headers.module.code.ts"
import { eventsEnded } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import {
  htmlCacheControl,
  serveClientStatic,
} from "akasha/alan/harness/web-static-asset/modules/serve-static/serve-static.module.code.ts"
import { randomId } from "akasha/page/id/modules/random-id/random-id.module.code.ts"
import { createRequestHandler, type ServerBuild } from "react-router"
import { z } from "zod"

declare module "react-router" {
  interface AppLoadContext {
    nonce?: string
  }
}

const HTML = "text/html"

const STOPPED_WITHIN_MS = 15_000

const TUNNEL_OUTLASTING_IDLE_SECONDS = 120

const PORT_SCHEMA = z.coerce.number().int().positive().max(65535).default(3000)

const HOST_SCHEMA = z.string().min(1).default("0.0.0.0")

type Stopping = { readonly stop: () => Promise<void> }

function endedOnTerm(server: Stopping): undefined {
  process.once("SIGTERM", () => {
    console.log(`[router-app] told to stop; ended ${eventsEnded()} page-change streams`)
    setTimeout(() => process.exit(0), STOPPED_WITHIN_MS).unref()
    void server.stop().finally(() => {
      console.log("[router-app] stopped")
      process.exit(0)
    })
  })
  return undefined
}

type RoutesReached = (request: Request, context: { readonly nonce: string }) => Promise<Response>

export const noReader: WhoIsReading = async () => ({ user: null })

export type RouterAppServing = {
  readonly clientDir: string
  readonly csp: AppCspConfig
  readonly whoIsReading: WhoIsReading
  readonly heldToGrants?: boolean
  readonly routes: RoutesReached
}

export function headed(answered: Response, csp: AppCspConfig, nonce: string): Response {
  if (!(answered.headers.get("content-type") ?? "").startsWith(HTML)) return answered
  const headers = new Headers(answered.headers)
  for (const [name, value] of Object.entries(buildSecurityHeaders(csp, nonce))) {
    headers.set(name, value)
  }
  headers.set("Cache-Control", htmlCacheControl(headers.get("cache-control")))
  return new Response(answered.body, {
    status: answered.status,
    statusText: answered.statusText,
    headers,
  })
}

export async function servedBy(
  serving: RouterAppServing,
  request: Request,
  pathname: string
): Promise<Response> {
  const asset = await serveClientStatic(pathname, serving.clientDir)
  if (asset) return asset
  const nonce = randomId()
  const reached = (): Promise<Response> => serving.routes(request, { nonce })
  const answered =
    serving.heldToGrants === true
      ? await readingFor(serving.whoIsReading, request, reached)
      : await reached()
  return headed(answered, serving.csp, nonce)
}

type Around = (request: Request, served: () => Promise<Response>) => Promise<Response>

export type RouterAppStart = {
  readonly name: string
  readonly root: string
  readonly csp: AppCspConfig
  readonly whoIsReading: WhoIsReading
  readonly heldToGrants?: boolean
  readonly maxRequestBodySize?: number
  readonly around?: Around
}

function asServerBuild(value: unknown): ServerBuild {
  return value as ServerBuild
}

const straight: Around = (_request, served) => served()

export async function servedRouterApp(start: RouterAppStart): Promise<Stopping> {
  const buildDir = join(start.root, "build")
  const build = asServerBuild(await import(join(buildDir, "server", "index.js")))
  const serving: RouterAppServing = {
    clientDir: join(buildDir, "client"),
    csp: start.csp,
    whoIsReading: start.whoIsReading,
    heldToGrants: start.heldToGrants,
    routes: createRequestHandler(build, "production"),
  }
  const around = start.around ?? straight
  const port = PORT_SCHEMA.parse(process.env["PORT"])
  const hostname = HOST_SCHEMA.parse(process.env["HOST"])
  const server = Bun.serve({
    port,
    hostname,
    idleTimeout: TUNNEL_OUTLASTING_IDLE_SECONDS,
    ...(start.maxRequestBodySize === undefined
      ? {}
      : { maxRequestBodySize: start.maxRequestBodySize }),
    error(error: Error) {
      console.error(`[${start.name}] fetch handler error:`, error)
      return new Response("Internal Server Error", { status: 500 })
    },
    fetch(request: Request): Promise<Response> {
      const pathname = new URL(request.url).pathname
      return around(request, () => servedBy(serving, request, pathname))
    },
  })
  endedOnTerm(server)
  console.log(`[${start.name}] listening on http://${hostname}:${port}`)
  return server
}
