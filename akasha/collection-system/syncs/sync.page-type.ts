import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { SyncRuns } from "./properties/sync-runs.page-property-entry.ts"

export type Sync = Page & {
  syncRuns: SyncRuns
}

export const sync = {
  id: "01a06835-e289-7ad6-8588-3a59938a1140",
  pageTypeSlug: "page-type",
  slug: "sync",
  definition: "one outside place this system pulls from, and how each pull went",
  pluralSlug: "syncs",
  extendsSlug: "page-type/page",
  partSlugs: [
    "page-property-entry/sync-runs",
    "instant-property/run-started-at",
    "instant-property/run-completed-at",
    "number-property/created-count",
    "number-property/duration-ms",
    "number-property/failed-count",
    "number-property/run-seq",
    "number-property/skipped-count",
    "number-property/updated-count",
    "select-property/run-status",
    "text-property/run-error-message",
  ],
  properties: [{ pagePropertySlug: "sync-runs", required: true, many: true, max: null }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sync runs one pull at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A second pull starting says the first died without saying so.",
    },
    {
      invariantKind: "departure",
      statement: "Which pull is in flight is rewritten on every start and finish.",
    },
    {
      invariantKind: "absence",
      statement: "What holds the pull in flight is never committed.",
    },
  ],
} as const satisfies PageType
