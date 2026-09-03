import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder.ts"

export interface TstlTsconfig {
  readonly rel: string
  readonly text: string
}

const TSCONFIG_BASENAME = "tsconfig.json"

export function deriveTstlRoots(configs: readonly TstlTsconfig[]): readonly string[] {
  const roots: string[] = []
  for (const { rel, text } of configs) {
    if (rel.includes("__fixtures__") || rel.includes("node_modules")) continue
    if (rel.split("/").pop() !== TSCONFIG_BASENAME) continue
    const parsed = ts.parseConfigFileTextToJson(rel, text)
    const config = parsed.config
    if (config == null || typeof config !== "object") continue
    if (!Object.hasOwn(config, "tstl")) continue
    roots.push(rel.slice(0, rel.length - (TSCONFIG_BASENAME.length + 1)))
  }
  return roots
}

export function matchesTstlRoot(rel: string, roots: readonly string[]): boolean {
  return roots.some((root) => rel === root || rel.startsWith(`${root}/`))
}

export function isExcludedFromTstlScan(rel: string): boolean {
  if (rel.endsWith(".d.ts")) return true
  return /\.test\.tsx?$/.test(rel)
}

const cachedRootsByRepo = new Map<string, readonly string[]>()

function tstlRoots(repoRoot: string): readonly string[] {
  const cached = cachedRootsByRepo.get(repoRoot)
  if (cached !== undefined) return cached
  const rels = findFiles({
    cwd: repoRoot,
    patterns: ["**/tsconfig.json"],
    absolute: false,
  })
  const configs = rels.map((rel) => ({ rel, text: readFileSync(resolve(repoRoot, rel), "utf8") }))
  const roots = deriveTstlRoots(configs)
  cachedRootsByRepo.set(repoRoot, roots)
  return roots
}

export function isTstlSourcePath(rel: string, repoRoot: string): boolean {
  if (isExcludedFromTstlScan(rel)) return false
  return matchesTstlRoot(rel, tstlRoots(repoRoot))
}
