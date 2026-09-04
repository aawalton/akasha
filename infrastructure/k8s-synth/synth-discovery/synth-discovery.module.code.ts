import { join } from "node:path"

export const DISCOVERY_GLOBS: readonly string[] = [
  "**/*.cluster-service.code.attachment.ts",
  "infrastructure/cluster-manifests/*-synth/*-synth.module.code.ts",
  "infrastructure/upscale/*-synth/*-synth.module.code.ts",
]

const NON_IDENTIFIER_COMPONENTS: ReadonlySet<string> = new Set(["k8s", "deploy", "src", "synth.ts"])

const K8S_SOURCE_ROOT = "infra/k8s/src/"

export function reachedThroughSrc(relPath: string): boolean {
  const tail = relPath.startsWith(K8S_SOURCE_ROOT) ? relPath.slice(K8S_SOURCE_ROOT.length) : relPath
  return tail.split("/").includes("src")
}

const SYNTH_GLOBS: readonly Bun.Glob[] = DISCOVERY_GLOBS.map((pattern) => new Bun.Glob(pattern))

export function isSynthPath(relPath: string): boolean {
  if (reachedThroughSrc(relPath)) return false
  return SYNTH_GLOBS.some((glob) => glob.match(relPath))
}

export function pathHasComponent(relPath: string, target: string): boolean {
  for (const component of relPath.split("/")) {
    if (NON_IDENTIFIER_COMPONENTS.has(component)) continue
    if (component === target) return true
  }
  return false
}

export function discoverSynthFiles(
  repoRoot: string,
  pkgFilter?: string | undefined
): readonly string[] {
  const matches = new Set<string>()
  for (const pattern of DISCOVERY_GLOBS) {
    const glob = new Bun.Glob(pattern)
    for (const rel of glob.scanSync({ cwd: repoRoot, onlyFiles: true })) {
      if (reachedThroughSrc(rel)) continue
      if (pkgFilter !== undefined && !pathHasComponent(rel, pkgFilter)) continue
      matches.add(join(repoRoot, rel))
    }
  }
  return [...matches].sort()
}
