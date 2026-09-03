import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type LocationTrace = Page

export const locationTrace = {
  id: "01a06836-795a-76ec-95fa-2b57e5a7dc38",
  pageTypeSlug: "page-type",
  slug: "location-trace",
  definition: "where Alan's phone put him at one moment",
  pluralSlug: "location-traces",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trace stands as a row on the ESO day the trace was captured in.",
    },
    {
      invariantKind: "departure",
      statement: "A trace is kept as the device reported it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing recomputes a trace from its neighbours.",
    },
    {
      invariantKind: "gap",
      statement: "Every trace Alan's phone sends is kept.",
    },
  ],
} as const satisfies PageType
