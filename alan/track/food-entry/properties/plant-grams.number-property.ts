import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const plantGrams = {
  id: "01a065a3-6e8b-7b5a-a3cc-f1016adcd288",
  type: "page-type/number-property",
  slug: "plant-grams",
  propertySlug: "plant-grams",
  definition: "the grams of whole plants in something Alan has eaten",
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
  createdAt: "2026-09-03T05:00:04.619Z",
  updatedAt: "2026-10-30T16:46:46.645Z",
} as const satisfies NumberProperty
