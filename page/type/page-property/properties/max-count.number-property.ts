import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxCount = {
  id: "01a07807-639f-78de-a246-cc6e8ef667e9",
  type: "page-type/number-property",
  slug: "max-count",
  propertySlug: "max-count",
  definition: "the most entries a list may hold",
  nullable: true,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a declaration with many values states a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How long one entry runs is stated as a length rather than as a count.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
