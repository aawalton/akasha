import type { DecisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.types.ts"

export const upkeep = {
  id: "01a04e11-9f98-7fc1-9a75-cc49b4124ad8",
  type: "page-type/decision-kind",
  slug: "upkeep",
  definition: "a state kept by hand because nothing could be built to have it",
  decisionGroup: "decision-group/condition",
  createdAt: "2026-08-29T15:09:32.952Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies DecisionKind
