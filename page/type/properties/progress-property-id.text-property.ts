import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const progressPropertyId = {
  id: "01a0683a-620a-7e65-a95a-efdc99a80eaa",
  type: "page-type/text-property",
  slug: "progress-property-id",
  propertySlug: "progress-property-id",
  definition: "the key of the property holding how far into a page the reader has come",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named here that the page type has no property for records nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
