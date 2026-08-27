import { existsSync, readFileSync } from "node:fs"
import { type WorkflowSurface, WorkflowSurfaceSchema } from "./surface"
import { surfacePath } from "./write"

export const readCachedSurface = (params: {
  readonly cacheDir: string
  readonly treeSha: string
}): WorkflowSurface | null => {
  const path = surfacePath(params.cacheDir, params.treeSha)
  if (!existsSync(path)) return null
  try {
    return WorkflowSurfaceSchema.parse(JSON.parse(readFileSync(path, "utf8")))
  } catch {
    return null
  }
}
