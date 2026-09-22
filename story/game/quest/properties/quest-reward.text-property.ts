import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const questReward = {
  id: "01a0c6ac-43ac-72a2-99fa-4a195e175aab",
  type: "page-type/text-property",
  slug: "quest-reward",
  propertySlug: "reward",
  definition: "what doing a quest earns, in the words the game promised it in",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest promising nothing says no reward.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
