import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const difficultyLevel = {
  id: "01a05fd8-c30f-7785-9331-9f5fa8347452",
  type: "page-type/text-property",
  slug: "difficulty-level",
  propertySlug: "difficulty-level",
  definition: "how hard what Alan was doing was on him",
  maxLength: 3,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A difficulty level is taken as a number and is written as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A difficulty level does not carry forward from the prior stretch of time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch matching no session activity is refused rather than rated zero.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
