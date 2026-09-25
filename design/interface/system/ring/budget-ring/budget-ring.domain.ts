import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const budgetRing = {
  id: "01a0655b-9cdd-7c1c-9464-84a197fb9eab",
  type: "page-type/domain",
  slug: "budget-ring",
  definition: "a ring that shows a budget",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The arc shows how much of the budget is spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color shows how long until the budget renews.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The arc and the color measure different quantities.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A full ring can be any color.",
    },
  ],
} as const satisfies Domain
