import type { DecisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.types.ts"

export const constraint = {
  id: "01a04e11-9f98-7f57-a74d-2bf329d4a0a0",
  type: "page-type/decision-kind",
  slug: "constraint",
  definition: "a limit nobody here chose",
  decisionGroup: "decision-group/design",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Knowing a constraint stops a reader asking for the impossible.",
    },
  ],
} as const satisfies DecisionKind
