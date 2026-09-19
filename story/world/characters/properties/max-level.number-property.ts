import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxLevel = {
  id: "01a0657a-9ccc-799d-b3da-5f74e280345a",
  type: "page-type/number-property",
  slug: "max-level",
  propertySlug: "max-level",
  definition: "the highest level a story ever gives a character",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The highest level is the level the text states rather than the number a tally reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character the text never levels has no highest level.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
