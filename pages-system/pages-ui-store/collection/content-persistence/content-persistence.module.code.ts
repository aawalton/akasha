import type { Page } from "@akasha/pages-core/page-types"

export interface ContentPagePersistencePort {
  loadPages: (ids: readonly string[]) => Promise<readonly Page[]>
  savePages: (pages: readonly Page[]) => undefined
  pinPages: (ids: readonly string[]) => undefined
  cachedIds: () => Promise<readonly string[]>
  clear: () => undefined
}
