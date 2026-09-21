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

const PORT = z.coerce.number().int().positive().default(3080).parse(process.env.PORT)

export const CONFIG = {
  ADMITTED,
  ROUTE_MAP,
  PORT,
}
