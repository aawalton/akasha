import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Seat = Page

export const seat = {
  id: "01a05035-2609-7463-ba49-ccaf20f5c337",
  pageTypeSlug: "page-type",
  slug: "seat",
  definition: "a place an agent works from",
  pluralSlug: "seats",
  extendsSlug: "page-type/page",
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's attributes can be re-stated without making it another seat.",
    },
  ],
} as const satisfies PageType
