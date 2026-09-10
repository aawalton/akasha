import type { Page } from "../../../pages/page.page-type.types.ts"
import type { SyncRuns } from "./properties/sync-runs.page-property-entry.types.ts"

export type Sync = Page & {
  syncRuns: SyncRuns
}
