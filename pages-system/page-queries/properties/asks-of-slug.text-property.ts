import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type AsksOfSlug = string

export const asksOfSlug = {
  id: "01a063ee-2a3b-7363-bba7-b3165d27a761",
  pageTypeSlug: "text-property",
  slug: "asks-of-slug",
  propertySlug: "asks-of-slug",
  definition: "the page type a query asks of",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query asks of one page type.",
    },
    {
      invariantKind: "departure",
      statement: "Most page types asked of have yet to move in.",
    },
    {
      invariantKind: "gap",
      statement: "The page type a query asks of is a page rather than a name held as text.",
    },
  ],
} as const satisfies TextProperty
