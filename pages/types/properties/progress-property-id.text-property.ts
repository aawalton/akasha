import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type ProgressPropertyId = string

export const progressPropertyId = {
  id: "01a0683a-620a-7e65-a95a-efdc99a80eaa",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "progress-property-id",
  propertySlug: "progress-property-id",
  definition: "the key of the property holding how far into a page the reader has come",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type has no property for records nothing.",
    },
  ],
} as const satisfies TextProperty
