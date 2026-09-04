import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type LogSource = Page

export const logSource = {
  id: "01a0657c-cb14-7c6f-83df-0d533f4f7821",
  pageTypeSlug: "page-type",
  slug: "log-source",
  definition: "a stream of console lines the processes behind a seat write",
  pluralSlug: "log-sources",
  extendsSlug: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is named for the process writing the lines rather than for the seat.",
    },
    {
      invariantKind: "departure",
      statement: "One source writes a separate day for each seat.",
    },
    {
      invariantKind: "departure",
      statement: "A source outlives every day of lines the source wrote.",
    },
    {
      invariantKind: "absence",
      statement: "A source carries nothing but the name the source is reached by.",
    },
  ],
} as const satisfies PageType
