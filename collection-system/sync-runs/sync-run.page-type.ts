import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type SyncRun = Page

export const syncRun = {
  id: "01a06835-e289-706f-b82b-cc895c8f24bf",
  pageTypeSlug: "page-type",
  slug: "sync-run",
  definition: "one pull from one outside place",
  pluralSlug: "sync-runs",
  partSlugs: [
    "instant-property/run-completed-at",
    "instant-property/run-started-at",
    "number-property/created-count",
    "number-property/duration-ms",
    "number-property/failed-count",
    "number-property/run-seq",
    "number-property/skipped-count",
    "number-property/updated-count",
    "select-property/run-status",
    "text-property/run-error-message",
  ],
  extendsSlug: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run sits beside the sync that run was a pull of rather than in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A run reporting no counts failed before reaching anything to count.",
    },
    {
      invariantKind: "departure",
      statement: "The runs beside a sync are that sync's entries rather than pages of their own.",
    },
  ],
} as const satisfies PageType
