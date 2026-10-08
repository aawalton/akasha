import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lengthPropertyId = {
  id: "01a0683a-620a-7c9f-8c62-ed7e2e10a9ca",
  type: "page-type/text-property",
  slug: "length-property-id",
  propertySlug: "length-property-id",
  definition: "the key of the property holding how long a page is",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose length is not known is never recorded as read at its end.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
