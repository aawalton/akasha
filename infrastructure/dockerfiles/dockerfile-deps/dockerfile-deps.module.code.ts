import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import { ROOT } from "../dockerfile-services/dockerfile-services.module.code.ts"

const JSON_VALUE_SCHEMA = z.unknown()

const PACKAGES_DIR_RE = /\.\.\/\.\.\/packages\/([^/]+)/

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null
}

export function readJson(path: string): Record<string, unknown> {
  const parsed = JSON_VALUE_SCHEMA.parse(JSON.parse(readFileSync(path, "utf-8")))
  return isRecord(parsed) ? parsed : {}
}

function asStringArray(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []
}

function asStringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "string") out[k] = v
  }
  return out
}

function asStringArrayRecord(value: unknown): Record<string, readonly string[]> {
  if (!isRecord(value)) return {}
  const out: Record<string, readonly string[]> = {}
  for (const [k, v] of Object.entries(value)) {
    out[k] = asStringArray(v)
  }
  return out
}

export function buildPackageNameMap(): Map<string, string> {
  const workspaces = listWorkspaceDirs(ROOT)
  const map = new Map<string, string>()

  for (const ws of workspaces) {
    if (ws.startsWith("apps/") || ws.startsWith("packages/apps/")) continue
    const pkgJsonPath = join(ROOT, ws, "package.json")
    if (!existsSync(pkgJsonPath)) continue
    const pkg = readJson(pkgJsonPath)
    if (typeof pkg.name !== "string") continue
    map.set(pkg.name, ws)
  }

  return map
}

export function getWorkspaceDeps(pkgJsonPath: string): Set<string> {
  const pkg = readJson(pkgJsonPath)
  const dependencies = asStringRecord(pkg.dependencies)
  const devDependencies = asStringRecord(pkg.devDependencies)
  const deps = new Set<string>()
  for (const [name, version] of Object.entries(dependencies)) {
    if (version === "workspace:*") deps.add(name)
  }
  for (const [name, version] of Object.entries(devDependencies)) {
    if (version === "workspace:*") deps.add(name)
  }
  return deps
}

export function getTsconfigPathDeps(
  tsconfigPath: string,
  nameMap: Map<string, string>
): Set<string> {
  const deps = new Set<string>()
  if (!existsSync(tsconfigPath)) return deps

  const tsconfig = readJson(tsconfigPath)
  const compilerOptions = isRecord(tsconfig.compilerOptions) ? tsconfig.compilerOptions : {}
  const paths = asStringArrayRecord(compilerOptions.paths)

  for (const [alias, targets] of Object.entries(paths)) {
    if (alias.startsWith("@/")) continue

    for (const target of targets) {
      if (!target.includes("../../packages/")) continue
      if (!PACKAGES_DIR_RE.test(target)) continue
      const [dirName] = requireMatchPositional(PACKAGES_DIR_RE, z.tuple([z.string()]), target)
      for (const [pkgName, pkgDir] of nameMap) {
        if (pkgDir === `packages/${dirName}`) {
          deps.add(pkgName)
          break
        }
      }
    }
  }

  return deps
}

export function collectAllDeps(appDir: string, nameMap: Map<string, string>): readonly string[] {
  const tsconfigPath = join(ROOT, appDir, "tsconfig.json")
  const pkgJsonPath = join(ROOT, appDir, "package.json")

  const directDeps = new Set([
    ...getWorkspaceDeps(pkgJsonPath),
    ...getTsconfigPathDeps(tsconfigPath, nameMap),
  ])

  const allDeps = new Set<string>()
  const queue = [...directDeps]

  while (queue.length > 0) {
    const dep = queue.pop()
    if (dep === undefined) break
    if (allDeps.has(dep)) continue
    allDeps.add(dep)

    const depDir = nameMap.get(dep)
    if (depDir == null) continue

    const depPkgPath = join(ROOT, depDir, "package.json")
    if (!existsSync(depPkgPath)) continue

    for (const transitiveDep of getWorkspaceDeps(depPkgPath)) {
      if (!allDeps.has(transitiveDep)) queue.push(transitiveDep)
    }
  }

  return [...allDeps].sort((a, b) => a.localeCompare(b))
}
