import {
  parseRouteMap,
  type RouteTarget,
} from "akasha/infrastructure/network/auth-proxy/modules/route-map-core/route-map-core.module.code.ts"
import { z } from "zod"

const ROUTE_MAP: Record<string, RouteTarget> = parseRouteMap(process.env.ROUTE_MAP)

export interface Caller {
  readonly sub: string
  readonly email: string
  readonly name: string
}

const callerShape = z.object({ sub: z.string(), email: z.string(), name: z.string() }).strict()

const ADMITTED: Readonly<Record<string, Caller>> = z
  .record(z.string(), callerShape)
  .parse(JSON.parse(z.string().default("{}").parse(process.env.ADMITTED)))

export interface PathRoute {
  host: string
  prefix: string
  target: string
  stripPrefix?: boolean
  websocket?: boolean
  stub?: { body: string }
}

const pathRouteSchema = z
  .object({
    host: z.string(),
    prefix: z.string(),
    target: z.string(),
    stripPrefix: z.boolean().optional(),
    websocket: z.boolean().optional(),
    stub: z.object({ body: z.string() }).strict().optional(),
  })
  .strict()

const PATH_ROUTES: PathRoute[] = z
  .array(pathRouteSchema)
  .parse(JSON.parse(z.string().default("[]").parse(process.env.PATH_ROUTES)))

const PORT = z.coerce.number().int().positive().default(3080).parse(process.env.PORT)

const CORS_ALLOWED_ORIGINS = z
  .string()
  .default("")
  .parse(process.env.CORS_ALLOWED_ORIGINS)
  .split(",")
  .map((o) => o.trim())
  .filter((o) => o !== "")

const CORS_ALLOWED_ORIGIN_PATTERNS: RegExp[] = z
  .string()
  .default("")
  .parse(process.env.CORS_ALLOWED_ORIGIN_PATTERNS)
  .split(",")
  .map((p) => p.trim())
  .filter((p) => p !== "")
  .map((source) => {
    try {
      return new RegExp(source)
    } catch (err) {
      throw new Error(
        `CORS_ALLOWED_ORIGIN_PATTERNS: invalid regex ${JSON.stringify(source)}: ${
          err instanceof Error ? err.message : String(err)
        }`
      )
    }
  })

const CORS_PATH_PREFIXES = z
  .string()
  .default("/auth/v1")
  .parse(process.env.CORS_PATH_PREFIXES)
  .split(",")
  .map((p) => p.trim())
  .filter((p) => p !== "")

export const CONFIG = {
  ADMITTED,
  ROUTE_MAP,
  PATH_ROUTES,
  PORT,
  CORS_ALLOWED_ORIGINS,
  CORS_ALLOWED_ORIGIN_PATTERNS,
  CORS_PATH_PREFIXES,
}
