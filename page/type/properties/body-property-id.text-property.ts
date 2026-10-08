import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bodyPropertyId = {
  id: "01a0683a-620a-7bd1-9f9f-26882ff5531b",
  type: "page-type/text-property",
  slug: "body-property-id",
  propertySlug: "body-property-id",
  definition: "the key of the property holding a page's body",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named here that the page type has no property for reads nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-22T14:00:26.000Z",
} as const satisfies TextProperty
