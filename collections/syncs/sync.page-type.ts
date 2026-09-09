import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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
  extends: ["page-type/page"],
  parts: ["page-property-entry/sync-runs"],
  properties: [
    {
      pageProperty: "page-property-entry/sync-runs",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
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
      statement: "The value with the pull in flight is never committed.",
    },
  ],
} as const satisfies PageType
