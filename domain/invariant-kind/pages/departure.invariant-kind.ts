import type { InvariantKind } from "akasha/domain/invariant-kind/invariant-kind.page-type.types.ts"

export const departure = {
  id: "01a04e11-9f98-742c-ba51-d96396b9ea5f",
  type: "invariant-kind",
  slug: "departure",
  definition: "a decision a reader would not guess right",
  decisionGroup: "decision-group/design",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Knowing a departure stops a reader undoing that departure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A departure states what is true today, so one that stopped being true is a lie.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A departure that stopped being true becomes a gap rather than worded back down.",
    },
  ],
} as const satisfies InvariantKind
