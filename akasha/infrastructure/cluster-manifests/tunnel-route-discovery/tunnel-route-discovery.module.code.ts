import { existsSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { dirname, join, relative } from "node:path"
import type { TunnelRoute } from "../tunnel-route/tunnel-route.module.code.ts"

const REPO_ROOT = checkoutRootAbove(import.meta.dirname)

function checkoutRootAbove(from: string): string {
  let at = from
  for (;;) {
    if (existsSync(join(at, "bun.lock"))) return at
    const up = dirname(at)
    if (up === at) throw new Error(`no \`bun.lock\` stands above ${from}`)
    at = up
  }
}
const EXCLUDED_DIRS = new Set(["node_modules", ".git", ".next", ".turbo", ".cache"])

export interface DiscoveredRoute {
  readonly route: TunnelRoute
  readonly sourceFile: string
}

export async function discoverTunnelRoutes(): Promise<readonly DiscoveredRoute[]> {
  const files = await walkForRoutes(REPO_ROOT)
  const sourced: DiscoveredRoute[] = []
  for (const file of files) {
    const mod = await import(file)
    const routes: TunnelRoute[] = mod.routes ?? mod.default ?? []
    for (const route of routes) {
      sourced.push({ route, sourceFile: relative(REPO_ROOT, file) })
    }
  }
  validateRoutes(sourced)
  return sourced
}

async function walkForRoutes(dir: string): Promise<readonly string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith(".") || EXCLUDED_DIRS.has(entry.name)) continue
      results.push(...(await walkForRoutes(join(dir, entry.name))))
      continue
    }
    if (entry.name === "tunnel-routes.ts") {
      results.push(join(dir, entry.name))
    }
  }
  return results
}

export function validateRoutes(sourced: readonly DiscoveredRoute[]): undefined {
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
