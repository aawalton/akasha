import type { FlagSpec } from "../../../../../akasha/checks/cluster-checks/modules/cli-args/cli-args.module.code.ts"
import { buildWorkflowSurface, scannedFilePaths } from "./build"
import { readCachedSurface } from "./read"
import { PROBE_CONTEXT_IDS, surfaceFilePaths, type WorkflowSurface } from "./surface"
import { DEFAULT_CACHE_DIR } from "./write"

export const WORKFLOW_SURFACE_FLAGS = {
  treeSha: { kind: "string" },
  cacheDir: { kind: "string" },
} as const satisfies Record<string, FlagSpec>

const isTreeSha = (value: string): boolean => /^[0-9a-f]{40}$/.test(value)

export const surfaceCovers = (params: {
  readonly surface: WorkflowSurface
  readonly files: readonly string[]
}): boolean => {
  const contexts = params.surface.contexts
  if (contexts.length !== PROBE_CONTEXT_IDS.length) return false
  if (!contexts.every((id, i) => id === PROBE_CONTEXT_IDS[i])) return false
  const held = surfaceFilePaths(params.surface)
  return held.length === params.files.length && held.every((path, i) => path === params.files[i])
}

export const getOrBuildWorkflowSurface = async (opts: {
  readonly repoRoot: string
  readonly cacheDir?: string
  readonly treeSha?: string
}): Promise<WorkflowSurface> => {
  const { repoRoot, treeSha } = opts
  const cacheDir = opts.cacheDir ?? DEFAULT_CACHE_DIR
  if (treeSha !== undefined && isTreeSha(treeSha)) {
    const cached = readCachedSurface({ cacheDir, treeSha })
    if (cached !== null) {
      if (surfaceCovers({ surface: cached, files: await scannedFilePaths(repoRoot) })) return cached
      console.warn(
        `[workflow-surface] cached surface at ${cacheDir}/${treeSha}.json does not match this tree's workflow files; building in-process`
      )
    }
  }
  return buildWorkflowSurface(repoRoot)
}
