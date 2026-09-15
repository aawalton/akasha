import type { InvariantKind } from "akasha/domain/invariant-kind/invariant-kind.page-type.types.ts"

export const constraint = {
  id: "01a04e11-9f98-7f57-a74d-2bf329d4a0a0",
  type: "invariant-kind",
  slug: "constraint",
  definition: "a limit nobody here chose",
  decisionGroup: "decision-group/design",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Knowing a constraint stops a reader asking for the impossible.",
    },
  ],
} as const satisfies InvariantKind
