import { isAbsolute, join, relative } from "node:path"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const DISCOVERY_GLOBS: readonly string[] = [
  "infrastructure/cluster/manifests/*-synth/*-synth.module.code.ts",
  "infrastructure/inference/generations/upscale/*-synth/*-synth.module.code.ts",
]

const MANIFEST = "manifest"

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

function codeBeside(repoRoot: string, pagePath: string): string | null {
  if (!pagePath.endsWith(PAGE_ENDING)) return null
  const beside = `${pagePath.slice(0, -PAGE_ENDING.length)}${CODE_ENDING}`
  return isAbsolute(beside) ? relative(repoRoot, beside) : beside
}

export function manifestCodePaths(repoRoot: string): readonly string[] {
  const found: string[] = []
  for (const one of valuesOfType(repoRoot, MANIFEST)) {
    const at = codeBeside(repoRoot, one.path)
    if (at !== null) found.push(at)
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
  for (const rel of manifestCodePaths(repoRoot)) taking(rel)
  return [...matches].sort()
}
