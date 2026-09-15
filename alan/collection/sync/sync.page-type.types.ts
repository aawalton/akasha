import type { SyncRuns } from "akasha/alan/collection/sync/properties/sync-runs.page-property-entry.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Sync = Page & {
  syncRuns: SyncRuns
}
