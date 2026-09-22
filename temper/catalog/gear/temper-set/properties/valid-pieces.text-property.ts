import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const validPieces = {
  id: "01a05fd1-d43f-7be1-a074-25f62cd6a7ee",
  type: "page-type/text-property",
  slug: "valid-pieces",
  propertySlug: "valid",
  definition: "a set's pieces",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every piece a set is made in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star covers every piece the game offers.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
