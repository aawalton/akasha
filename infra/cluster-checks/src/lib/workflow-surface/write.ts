import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { writeFileAtomicSync } from "@shared/utils-fs/atomic-write"
import type { WorkflowSurface } from "./surface"

export const DEFAULT_CACHE_DIR = "/ci-storage/workflow-surface"

export const surfacePath = (cacheDir: string, treeSha: string): string =>
  join(cacheDir, `${treeSha}.json`)

export const writeCachedSurface = (params: {
  readonly cacheDir: string
  readonly treeSha: string
  readonly surface: WorkflowSurface
}): undefined => {
  const { cacheDir, treeSha, surface } = params
  mkdirSync(cacheDir, { recursive: true })
  writeFileAtomicSync(surfacePath(cacheDir, treeSha), JSON.stringify(surface))
}
