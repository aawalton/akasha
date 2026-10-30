import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const difficultyLevel = {
  id: "01a05fd8-c30f-7785-9331-9f5fa8347452",
  type: "page-type/text-property",
  slug: "difficulty-level",
  propertySlug: "difficulty-level",
  definition: "how hard a tracked session is for Alan",
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
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T16:39:40.725Z",
} as const satisfies TextProperty
