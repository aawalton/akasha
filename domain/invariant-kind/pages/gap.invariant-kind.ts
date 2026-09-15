import type { InvariantKind } from "akasha/domain/invariant-kind/invariant-kind.page-type.types.ts"

export const gap = {
  id: "01a04e11-9f98-7835-9710-117a527c190d",
  type: "page-type/invariant-kind",
  slug: "gap",
  definition: "a distance between what the domain says and what it does",
  decisionGroup: "decision-group/intent",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Knowing a gap stops a reader relying on that gap.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gap states what is meant, so a gap is honest before the domain can keep it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule sharpened past what the domain can do arrives here rather than as a departure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A gap names a state the domain should be in rather than an act to take or a reason to act.",
    },
  ],
} as const satisfies InvariantKind
