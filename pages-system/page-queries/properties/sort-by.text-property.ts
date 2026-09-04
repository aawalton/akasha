import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type SortBy = string

export const sortBy = {
  id: "01a063ee-2a3b-73bd-a1a3-41f5ed381a14",
  pageTypeSlug: "text-property",
  slug: "sort-by",
  propertySlug: "sort-by",
  definition: "the key a query orders its answer by",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query naming no key here is answered in the order its pages are read.",
    },
  ],
} as const satisfies TextProperty
