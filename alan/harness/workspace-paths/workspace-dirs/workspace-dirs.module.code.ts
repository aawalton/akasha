import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const ROOT_PACKAGE_JSON_SCHEMA = z
  .object({ workspaces: z.array(z.string()).optional() })
  .passthrough()

const ONE_SUFFIX = "/*"

const DEEP_SUFFIX = "/**"

const DEEP_ALONE = "**"

const HIDDEN = "."

const LINKED_FOLDER = "node_modules"

function unsupported(entry: string): Error {
  return new Error(
    `listWorkspaceDirs: unsupported workspaces glob "${entry}" — only a bare "**" and trailing "/*" and "/**" segments are expanded today`
  )
}

function deepPrefixIn(entry: string): string | null {
  if (entry === DEEP_ALONE) return ""
  if (!entry.endsWith(DEEP_SUFFIX)) return null
  const prefix = entry.slice(0, -DEEP_SUFFIX.length)
  if (prefix.includes("*")) throw unsupported(entry)
  return prefix
}

function parseTrailingStarGlob(entry: string): { prefix: string; depth: number } {
  let prefix = entry
  let depth = 0
  while (prefix.endsWith(ONE_SUFFIX)) {
    prefix = prefix.slice(0, -ONE_SUFFIX.length)
    depth += 1
  }
  if (depth === 0 || prefix.includes("*")) throw unsupported(entry)
  return { prefix, depth }
}

function walkedInto(name: string): boolean {
  return name !== LINKED_FOLDER && !name.startsWith(HIDDEN)
}

function foldersBelow(repoRoot: string, prefix: string): readonly string[] {
  const found: string[] = []
  const abs = join(repoRoot, prefix)
  if (!existsSync(abs)) return found
  for (const child of readdirSync(abs, { withFileTypes: true })) {
    if (!child.isDirectory() || !walkedInto(child.name)) continue
    const rel = prefix === "" ? child.name : `${prefix}/${child.name}`
    found.push(rel)
    found.push(...foldersBelow(repoRoot, rel))
  }
  return found
}

function holdingAManifest(repoRoot: string, dirs: readonly string[]): readonly string[] {
  return dirs.filter((rel) => existsSync(join(repoRoot, rel, "package.json"))).sort()
}

function expandGlobEntry(repoRoot: string, entry: string): readonly string[] {
  const deep = deepPrefixIn(entry)
  if (deep !== null) return holdingAManifest(repoRoot, foldersBelow(repoRoot, deep))
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
  return holdingAManifest(repoRoot, level)
}

function workspaceGlobCovers(entry: string, relPath: string): boolean {
  if (!entry.includes("*")) return false
  const deep = deepPrefixIn(entry)
  if (deep !== null) {
    if (deep === "") return relPath !== ""
    const under = `${deep}/`
    return relPath.startsWith(under) && relPath.slice(under.length) !== ""
  }
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
