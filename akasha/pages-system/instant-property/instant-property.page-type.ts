import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type InstantProperty = PageProperty

export const instantProperty = {
  id: "01a053de-99ba-762f-9c2f-ba77a8468f7a",
  pageTypeSlug: "page-type",
  slug: "instant-property",
  definition: "a page property holding a single point in time",
  pluralSlug: "instant-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An instant is written as ISO 8601 in UTC to the millisecond and closes with `Z`.",
    },
    {
      invariantKind: "departure",
      statement: "An instant property's slug closes with `-at`.",
    },
  ],
} as const satisfies PageType
