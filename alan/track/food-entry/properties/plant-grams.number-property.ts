import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const plantGrams = {
  id: "01a065a3-6e8b-7b5a-a3cc-f1016adcd288",
  type: "page-type/number-property",
  slug: "plant-grams",
  propertySlug: "plant-grams",
  definition: "the grams of whole plant a thing eaten contributes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plant processed into something else stops counting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Muesli counts and bread does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plant grams figure is captured by judgment.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
