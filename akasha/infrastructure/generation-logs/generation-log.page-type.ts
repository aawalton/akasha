import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export const generationLog = {
  id: "01a01d18-306b-7000-9796-b41f285a1bad",
  pageTypeSlug: "page-type",
  slug: "generation-log",
  definition: "the standing record of what one set of model services has made",
  pluralSlug: "generation-logs",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A generation log holds its runs and their outputs beside it, rather than filing each on its own.",
    },
  ],
} as const satisfies PageType

export type GenerationLog = Page
