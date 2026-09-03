import { requireEnv } from "@akasha/utils-narrow/require-env"
import { z } from "zod"

import { parseRouteMap, type RouteTarget } from "../route-map-core/route-map-core.module.code.ts"

const SUPABASE_JWKS_URL = requireEnv("SUPABASE_JWKS_URL")

const SUPABASE_JWT_ISSUER = requireEnv("SUPABASE_JWT_ISSUER")

const SUPABASE_JWT_AUDIENCE = z
  .string()
  .default("authenticated")
  .parse(process.env.SUPABASE_JWT_AUDIENCE)

const ROUTE_MAP: Record<string, RouteTarget> = parseRouteMap(process.env.ROUTE_MAP)

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

const SIGN_IN_URL = z
  .string()
  .default("https://alanwalton.com/sign-in")
  .parse(process.env.SIGN_IN_URL)
const PORT = z.coerce.number().int().positive().default(3080).parse(process.env.PORT)

const SESSION_FETCH_TIMEOUT_MS = z.coerce
  .number()
  .int()
  .positive()
  .default(3000)
  .parse(process.env.SESSION_FETCH_TIMEOUT_MS)
const CACHE_POSITIVE_TTL_MS = z.coerce
  .number()
  .int()
  .positive()
  .default(90000)
  .parse(process.env.CACHE_POSITIVE_TTL_MS)
const CACHE_NEGATIVE_TTL_MS = z.coerce
  .number()
  .int()
  .positive()
  .default(10000)
  .parse(process.env.CACHE_NEGATIVE_TTL_MS)
const CACHE_MAX_ENTRIES = z.coerce
  .number()
  .int()
  .positive()
  .default(1000)
  .parse(process.env.CACHE_MAX_ENTRIES)
const JWKS_CACHE_TTL_MS = z.coerce
  .number()
  .int()
  .positive()
  .default(300000)
  .parse(process.env.JWKS_CACHE_TTL_MS)
const JWT_CLOCK_SKEW_MS = z.coerce
  .number()
  .int()
  .nonnegative()
  .default(30000)
  .parse(process.env.JWT_CLOCK_SKEW_MS)

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
  SUPABASE_JWKS_URL,
  SUPABASE_JWT_ISSUER,
  SUPABASE_JWT_AUDIENCE,
  ROUTE_MAP,
  PATH_ROUTES,
  SIGN_IN_URL,
  PORT,
  SESSION_FETCH_TIMEOUT_MS,
  CACHE_POSITIVE_TTL_MS,
  CACHE_NEGATIVE_TTL_MS,
  CACHE_MAX_ENTRIES,
  JWKS_CACHE_TTL_MS,
  JWT_CLOCK_SKEW_MS,
  CORS_ALLOWED_ORIGINS,
  CORS_ALLOWED_ORIGIN_PATTERNS,
  CORS_PATH_PREFIXES,
}
