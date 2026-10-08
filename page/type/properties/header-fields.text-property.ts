import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const headerFields = {
  id: "01a0683a-620a-7905-b43d-ad803b4fae71",
  type: "page-type/text-property",
  slug: "header-fields",
  propertySlug: "fields",
  definition: "the keys of the properties standing above the pages a page gathers",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A header naming keys states those keys in the order those keys stand in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:04:11.786Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
