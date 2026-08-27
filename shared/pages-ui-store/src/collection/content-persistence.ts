import type { Page } from "@shared/pages-core/page-types"

export interface ContentPagePersistencePort {
  loadPages: (ids: readonly string[]) => Promise<readonly Page[]>
  savePages: (pages: readonly Page[]) => void
  pinPages: (ids: readonly string[]) => void
  cachedIds: () => Promise<readonly string[]>
  clear: () => void
}
