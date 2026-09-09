import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type SequenceOrderBy = string

export const sequenceOrderBy = {
  id: "01a062de-2001-7002-8dd0-f44937908528",
  pageTypeSlug: "text-property",
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
} as const satisfies TextProperty
