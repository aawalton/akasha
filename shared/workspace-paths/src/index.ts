import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const ROOT_PACKAGE_JSON_SCHEMA = z
  .object({ workspaces: z.array(z.string()).optional() })
  .passthrough()

function parseTrailingStarGlob(entry: string): { prefix: string; depth: number } {
  const SUFFIX = "/*"
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(SUFFIX)) {
    prefix = prefix.slice(0, -SUFFIX.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) {
    throw new Error(
      `listWorkspaceDirs: unsupported workspaces glob "${entry}" — only trailing "/*" segments are expanded today`
    )
  }
  return { prefix, depth }
}

function expandGlobEntry(repoRoot: string, entry: string): readonly string[] {
  const { prefix, depth } = parseTrailingStarGlob(entry)
  let level: readonly string[] = [prefix]
  for (let i = 0; i < depth; i += 1) {
    const next: string[] = []
    for (const rel of level) {
      const abs = join(repoRoot, rel)
      if (!existsSync(abs)) continue
      for (const child of readdirSync(abs, { withFileTypes: true })) {
        if (child.isDirectory()) next.push(`${rel}/${child.name}`)
      }
    }
    level = next
  }
  return level.filter((rel) => existsSync(join(repoRoot, rel, "package.json"))).sort()
}

function workspaceGlobCovers(entry: string, relPath: string): boolean {
  if (!entry.includes("*")) return false
  const { prefix, depth } = parseTrailingStarGlob(entry)
  const base = `${prefix}/`
  if (!relPath.startsWith(base)) return false
  const rest = relPath.slice(base.length)
  if (rest === "") return false
  return rest.split("/").length === depth
}

export function isCoveredByWorkspaceGlob(workspaces: readonly string[], relPath: string): boolean {
  return workspaces.some((entry) => workspaceGlobCovers(entry, relPath))
}

export function listWorkspaceDirs(repoRoot: string): readonly string[] {
  const rootPath = join(repoRoot, "package.json")
  const parsed = ROOT_PACKAGE_JSON_SCHEMA.parse(JSON.parse(readFileSync(rootPath, "utf-8")))
  const entries = parsed.workspaces ?? []
  const out: string[] = []
  for (const entry of entries) {
    if (entry.includes("*")) out.push(...expandGlobEntry(repoRoot, entry))
    else out.push(entry)
  }
  return out
}

const WORKSPACE_MANIFEST_SCHEMA = z
  .object({
    name: z.string().optional(),
    bin: z.union([z.string(), z.record(z.string(), z.string())]).optional(),
  })
  .passthrough()

export function binNamesFromManifest(
  pkg: Pick<z.infer<typeof WORKSPACE_MANIFEST_SCHEMA>, "name" | "bin">
): readonly string[] {
  const bin = pkg.bin
  if (bin === undefined) return []
  if (typeof bin === "string") {
    const unscoped = pkg.name?.split("/").pop() ?? ""
    return unscoped.length > 0 ? [unscoped] : []
  }
  return Object.keys(bin)
}

export function findMissingBins(
  expected: readonly string[],
  present: ReadonlySet<string>
): readonly string[] {
  return [...new Set(expected)].filter((name) => !present.has(name)).sort()
}

export function expectedWorkspaceBinNames(repoRoot: string): readonly string[] {
  const expected: string[] = []
  for (const dir of listWorkspaceDirs(repoRoot)) {
    const manifestPath = join(repoRoot, dir, "package.json")
    if (!existsSync(manifestPath)) continue
    const manifest = WORKSPACE_MANIFEST_SCHEMA.parse(
      JSON.parse(readFileSync(manifestPath, "utf-8"))
    )
    expected.push(...binNamesFromManifest(manifest))
  }
  return expected
}
