import { z } from "zod"

export interface RouteTarget {
  target: string
  proxy?: string
}

const routeEntrySchema = z.union([
  z.string(),
  z.object({ target: z.string(), proxy: z.string().optional() }).strict(),
])

const routeMapSchema = z.record(z.string(), routeEntrySchema)

export function parseRouteMap(raw: string | undefined): Record<string, RouteTarget> {
  const parsed = routeMapSchema.parse(JSON.parse(z.string().default("{}").parse(raw)))
  return Object.fromEntries(
    Object.entries(parsed).map(([host, entry]) => [
      host,
      typeof entry === "string" ? { target: entry } : entry,
    ])
  )
}
