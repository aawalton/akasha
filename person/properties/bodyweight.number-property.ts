import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const bodyweight = {
  id: "01a06860-a0ef-76b6-bebf-a5ed8fc42f7b",
  type: "page-type/number-property",
  slug: "bodyweight",
  propertySlug: "bodyweight",
  definition: "what a body weighs, in pounds",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person has the weight last measured and a day the weight measured that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weight a movement is counted against is read off the person's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement's load factor is the share of this weight that movement has.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
