import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const title = {
  id: "01a05fac-7582-7694-ae1f-480fe66ea27b",
  type: "page-type/text-property",
  slug: "title",
  propertySlug: "title",
  definition: "a thing's name",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is written as the name is written rather than as a slug is written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
