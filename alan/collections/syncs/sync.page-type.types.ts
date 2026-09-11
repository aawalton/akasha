import type { SyncRuns } from "akasha/alan/collections/syncs/properties/sync-runs.page-property-entry.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type Sync = Page & {
  syncRuns: SyncRuns
}
