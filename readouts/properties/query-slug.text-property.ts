import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type QuerySlug = string

export const querySlug = {
  id: "01a063bd-a525-7ca0-b2b5-b56637eabc00",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "query-slug",
  propertySlug: "query-slug",
  definition: "the query a reading is answered by",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout naming no query is drawn from a reading taken elsewhere.",
    },
    {
      invariantKind: "gap",
      statement: "The query a readout names is a page rather than a name held as text.",
    },
  ],
} as const satisfies TextProperty
