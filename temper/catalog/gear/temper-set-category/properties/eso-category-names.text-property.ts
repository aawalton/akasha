import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoCategoryNames = {
  id: "01a0e110-59ba-7cad-8b46-f3f3f315505d",
  type: "page-type/text-property",
  slug: "eso-category-names",
  propertySlug: "eso-category-names",
  definition: "a name the game files a set under that falls in a set category",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is written as the game spells it and matched without regard to case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no set category states files its sets under the other category.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
