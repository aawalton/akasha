import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const sequenceOrderBy = {
  id: "01a062de-2001-7002-8dd0-f44937908528",
  type: "text-property",
  slug: "sequence-order-by",
  propertySlug: "order-by",
  definition: "the key a run of pages is sorted by",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type has no property for sorts nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
