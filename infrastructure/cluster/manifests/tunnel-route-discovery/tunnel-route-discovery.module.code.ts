import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import type { TunnelRoute } from "akasha/infrastructure/cluster/manifests/tunnel-route/tunnel-route.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { pageTypesIn } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { shapeOf } from "akasha/pages/indexes/property-shaping/property-shaping.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const REPO_ROOT = checkoutRootAbove(import.meta.dirname)

function checkoutRootAbove(from: string): string {
  let at = from
  for (;;) {
    if (existsSync(join(at, "bun.lock"))) return at
    const up = dirname(at)
    if (up === at) throw new Error(`no \`bun.lock\` is above ${from}`)
    at = up
  }
}

const CODE_FILE_PROPERTY = "code-file-property"

const TUNNEL_ROUTES = "tunnel-routes"

export interface DiscoveredRoute {
  readonly route: TunnelRoute
  readonly sourceFile: string
}

function routesFileName(root: string): string {
  const filed = shapeOf(root, `${CODE_FILE_PROPERTY}/${TUNNEL_ROUTES}`)
  const named = "refused" in filed ? null : filed.shape.fileName
  if (named === null) {
    throw new Error(
      `no \`${CODE_FILE_PROPERTY}\` page carries the slug \`${TUNNEL_ROUTES}\` with a file name, so nothing says what a routes file is called`
    )
  }
  return named
}

function routeFilesIn(root: string): readonly string[] {
  const named = routesFileName(root)
  const key = exportedAs(TUNNEL_ROUTES)
  const found: string[] = []
  for (const pageTypeSlug of pageTypesIn(root)) {
    for (const one of valuesOfType(root, pageTypeSlug)) {
      if (textAt(one.value, key) === null) continue
      found.push(join(dirname(one.path), named))
    }
  }
  return found.sort()
}

export async function discoverTunnelRoutes(): Promise<readonly DiscoveredRoute[]> {
  const sourced: DiscoveredRoute[] = []
  for (const sourceFile of routeFilesIn(REPO_ROOT)) {
    const mod = await import(join(REPO_ROOT, sourceFile))
    const routes: TunnelRoute[] = mod.routes ?? mod.default ?? []
    for (const route of routes) {
      sourced.push({ route, sourceFile })
    }
  }
  validateRoutes(sourced)
  return sourced
}

function validateRoutes(sourced: readonly DiscoveredRoute[]): undefined {
  for (const { route, sourceFile } of sourced) {
    if ((route.name?.trim() ?? "") === "") {
      throw new Error(`empty name in ${sourceFile}`)
    }
    if ((route.hostname?.trim() ?? "") === "") {
      throw new Error(`empty hostname in ${sourceFile} (name="${route.name}")`)
    }
    if ((route.service?.trim() ?? "") === "") {
      throw new Error(`empty service in ${sourceFile} (name="${route.name}")`)
    }
  }

  const seenName = new Map<string, string>()
  for (const { route, sourceFile } of sourced) {
    const existing = seenName.get(route.name)
    if (existing != null) {
      throw new Error(`duplicate name "${route.name}" in ${sourceFile} (first seen in ${existing})`)
    }
    seenName.set(route.name, sourceFile)
  }

  const seenHost = new Map<string, string>()
  for (const { route, sourceFile } of sourced) {
    const existing = seenHost.get(route.hostname)
    if (existing != null) {
      throw new Error(
        `duplicate hostname "${route.hostname}" in ${sourceFile} (first seen in ${existing})`
      )
    }
    seenHost.set(route.hostname, sourceFile)
  }
}
