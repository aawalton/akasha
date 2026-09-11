import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const bodyweight = {
  id: "01a06860-a0ef-76b6-bebf-a5ed8fc42f7b",
  type: "number-property",
  slug: "bodyweight",
  propertySlug: "bodyweight",
  definition: "what a body weighs, in pounds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A person has the weight last measured and a day the weight measured that day.",
    },
    {
      invariantKind: "departure",
      statement: "The weight a movement is counted against is read off the person's page.",
    },
    {
      invariantKind: "departure",
      statement: "A movement's load factor is the share of this weight that movement has.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
