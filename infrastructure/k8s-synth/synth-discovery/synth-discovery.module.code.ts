import { isAbsolute, join, relative } from "node:path"
import { valuesOfType } from "@akasha/indexes"

export const DISCOVERY_GLOBS: readonly string[] = [
  "infrastructure/cluster-manifests/*-synth/*-synth.module.code.ts",
  "inference/generations/upscale/*-synth/*-synth.module.code.ts",
]

const CLUSTER_SERVICE = "cluster-service"

const MANIFEST = "manifest"

const MANIFEST_SLUG = "manifestSlug"

const SLUG = "slug"

const PAGE_ENDING = ".ts"

const CODE_ENDING = ".code.ts"

const MANIFEST_CODE_ENDING = `.${MANIFEST}${CODE_ENDING}`

const NON_IDENTIFIER_COMPONENTS: ReadonlySet<string> = new Set(["k8s", "deploy", "src", "synth.ts"])

const K8S_SOURCE_ROOT = "infra/k8s/src/"

export function reachedThroughSrc(relPath: string): boolean {
  const tail = relPath.startsWith(K8S_SOURCE_ROOT) ? relPath.slice(K8S_SOURCE_ROOT.length) : relPath
  return tail.split("/").includes("src")
}

const SYNTH_GLOBS: readonly Bun.Glob[] = DISCOVERY_GLOBS.map((pattern) => new Bun.Glob(pattern))

export function isSynthPath(relPath: string): boolean {
  if (reachedThroughSrc(relPath)) return false
  if (relPath.endsWith(MANIFEST_CODE_ENDING)) return true
  return SYNTH_GLOBS.some((glob) => glob.match(relPath))
}

export function pathHasComponent(relPath: string, target: string): boolean {
  for (const component of relPath.split("/")) {
    if (NON_IDENTIFIER_COMPONENTS.has(component)) continue
    if (component === target) return true
  }
  return false
}

function textIn(value: unknown, key: string): string | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null
  const held = (value as Record<string, unknown>)[key]
  return typeof held === "string" ? held : null
}

function codeBeside(repoRoot: string, pagePath: string): string | null {
  if (!pagePath.endsWith(PAGE_ENDING)) return null
  const beside = `${pagePath.slice(0, -PAGE_ENDING.length)}${CODE_ENDING}`
  return isAbsolute(beside) ? relative(repoRoot, beside) : beside
}

export function appliedManifestPaths(repoRoot: string): readonly string[] {
  const codeOfSlug = new Map<string, string>()
  for (const one of valuesOfType(repoRoot, MANIFEST)) {
    const slug = textIn(one.value, SLUG)
    if (slug === null || codeOfSlug.has(slug)) continue
    const at = codeBeside(repoRoot, one.path)
    if (at !== null) codeOfSlug.set(slug, at)
  }
  const found: string[] = []
  for (const one of valuesOfType(repoRoot, CLUSTER_SERVICE)) {
    const named = textIn(one.value, MANIFEST_SLUG)
    if (named === null) continue
    const at = codeOfSlug.get(named)
    if (at !== undefined) found.push(at)
  }
  return found
}

export function discoverSynthFiles(
  repoRoot: string,
  pkgFilter?: string | undefined
): readonly string[] {
  const matches = new Set<string>()
  const taking = (rel: string): undefined => {
    if (reachedThroughSrc(rel)) return
    if (pkgFilter !== undefined && !pathHasComponent(rel, pkgFilter)) return
    matches.add(join(repoRoot, rel))
  }
  for (const pattern of DISCOVERY_GLOBS) {
    const glob = new Bun.Glob(pattern)
    for (const rel of glob.scanSync({ cwd: repoRoot, onlyFiles: true })) taking(rel)
  }
  for (const rel of appliedManifestPaths(repoRoot)) taking(rel)
  return [...matches].sort()
}
