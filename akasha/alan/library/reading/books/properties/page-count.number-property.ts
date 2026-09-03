import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PageCount = number

export const pageCount = {
  id: "01a06741-dd0f-7005-b740-1e4345152777",
  pageTypeSlug: "number-property",
  slug: "page-count",
  propertySlug: "page-count",
  definition: "how many pages an edition runs to",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page count is the edition's rather than the book's.",
    },
    {
      invariantKind: "absence",
      statement: "No length counted in words is read off a page count.",
    },
  ],
} as const satisfies NumberProperty
