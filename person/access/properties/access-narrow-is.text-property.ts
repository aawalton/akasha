import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accessNarrowIs = {
  id: "01a0c521-8298-7072-b4b2-9766214ee349",
  type: "page-type/text-property",
  slug: "access-narrow-is",
  propertySlug: "is",
  definition: "the value that key holds on every page the access reaches",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding another value under that key is no page the access reaches.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
