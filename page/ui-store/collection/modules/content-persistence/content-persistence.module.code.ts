import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

export interface ContentPagePersistencePort {
  loadPages: (ids: readonly string[]) => Promise<readonly Page[]>
  savePages: (pages: readonly Page[]) => undefined
  clear: () => undefined
}
