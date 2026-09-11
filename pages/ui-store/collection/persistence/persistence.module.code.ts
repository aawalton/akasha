import type { PageRow } from "akasha/pages/ui-store/collection/page-row/page-row.module.code.ts"
import type { ShapeResumeState } from "akasha/pages/ui-store/realtime/shape-meta/shape-meta.module.code.ts"

export interface PersistedPagesSnapshot {
  readonly version: 1
  readonly rows: readonly PageRow[]
  readonly resume: readonly (readonly [string, ShapeResumeState])[]
}

export function buildPagesSnapshot(
  rows: readonly PageRow[],
  resume: readonly (readonly [string, ShapeResumeState])[]
): PersistedPagesSnapshot {
  return { version: 1, rows, resume }
}

export interface PagesPersistencePort {
  load: () => Promise<PersistedPagesSnapshot | null>
  save: (snapshot: PersistedPagesSnapshot) => undefined
  clear: () => undefined
}
