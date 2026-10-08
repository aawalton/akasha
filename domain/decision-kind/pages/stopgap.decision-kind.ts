import type { DecisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.types.ts"

export const stopgap = {
  id: "01a04e11-9f98-71ff-aa09-58376078e6f5",
  type: "page-type/decision-kind",
  slug: "stopgap",
  definition: "a state kept by hand until something is built to have it",
  decisionGroup: "decision-group/condition",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stopgap is paired with a gap to make the stopgap always true.",
    },
  ],
  createdAt: "2026-08-29T15:09:32.952Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies DecisionKind
