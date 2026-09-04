import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PlantGrams = number

export const plantGrams = {
  id: "01a065a3-6e8b-7b5a-a3cc-f1016adcd288",
  pageTypeSlug: "number-property",
  slug: "plant-grams",
  propertySlug: "plant-grams",
  definition: "the grams of whole plant one thing eaten contributes",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A plant processed into something else stops counting: muesli counts and bread does not.",
    },
    {
      invariantKind: "departure",
      statement: "A plant grams figure is captured by judgment.",
    },
  ],
} as const satisfies NumberProperty
