import type { TunnelRoute } from "akasha/infrastructure/cluster/manifest/modules/tunnel-route/tunnel-route.module.code.ts"
import { pageTypesIn } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  recordsIn,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TUNNEL_ROUTES = "tunnel-routes"

const NAME = "name"

const HOSTNAME = "hostname"

const SERVICE = "service"

export interface DiscoveredRoute {
  readonly route: TunnelRoute
  readonly sourcePage: string
}

function routeIn(held: Value): TunnelRoute {
  return {
    name: textAt(held, NAME) ?? "",
    hostname: textAt(held, HOSTNAME) ?? "",
    service: textAt(held, SERVICE) ?? "",
  }
}

function statedIn(given: string | Reading): readonly DiscoveredRoute[] {
  const reading = readingIn(given)
  const key = exportedAs(TUNNEL_ROUTES)
  const found: DiscoveredRoute[] = []
  for (const pageTypeSlug of pageTypesIn(reading)) {
    for (const one of valuesOfType(reading, pageTypeSlug)) {
      const held = one.value[key]
      if (held === undefined) continue
      for (const stated of recordsIn(held)) {
        found.push({ route: routeIn(stated), sourcePage: one.path })
      }
    }
  }
  return found.sort((one, other) =>
    one.sourcePage < other.sourcePage ? -1 : one.sourcePage > other.sourcePage ? 1 : 0
  )
}

export function discoverTunnelRoutes(
  given: string | Reading = akashaRoot()
): readonly DiscoveredRoute[] {
  const sourced = statedIn(given)
  validateRoutes(sourced)
  return sourced
}

function validateRoutes(sourced: readonly DiscoveredRoute[]): undefined {
  for (const { route, sourcePage } of sourced) {
    if (route.name.trim() === "") {
      throw new Error(`empty name in ${sourcePage}`)
    }
    if (route.hostname.trim() === "") {
      throw new Error(`empty hostname in ${sourcePage} (name="${route.name}")`)
    }
    if (route.service.trim() === "") {
      throw new Error(`empty service in ${sourcePage} (name="${route.name}")`)
    }
  }

  const seenName = new Map<string, string>()
  for (const { route, sourcePage } of sourced) {
    const existing = seenName.get(route.name)
    if (existing != null) {
      throw new Error(`duplicate name "${route.name}" in ${sourcePage} (first seen in ${existing})`)
    }
    seenName.set(route.name, sourcePage)
  }

  const seenHost = new Map<string, string>()
  for (const { route, sourcePage } of sourced) {
    const existing = seenHost.get(route.hostname)
    if (existing != null) {
      throw new Error(
        `duplicate hostname "${route.hostname}" in ${sourcePage} (first seen in ${existing})`
      )
    }
    seenHost.set(route.hostname, sourcePage)
  }
}
