import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type MaxCount = number

export const maxCount = {
  id: "01a07807-639f-78de-a246-cc6e8ef667e9",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "max-count",
  propertySlug: "max-count",
  definition: "the most entries a list may hold",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a declaration with many values states a count.",
    },
    {
      invariantKind: "departure",
      statement: "How long one entry runs is stated as a length rather than as a count.",
    },
  ],
} as const satisfies NumberProperty
