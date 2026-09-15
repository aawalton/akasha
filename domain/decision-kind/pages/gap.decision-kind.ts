import type { DecisionKind } from "akasha/domain/decision-kind/decision-kind.page-type.types.ts"

export const gap = {
  id: "01a04e11-9f98-7835-9710-117a527c190d",
  type: "page-type/decision-kind",
  slug: "gap",
  definition: "a distance between what the domain says and what it does",
  decisionGroup: "decision-group/intent",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Knowing a gap stops a reader relying on that gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap states what is meant, so a gap is honest before the domain can keep it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule sharpened past what the domain can do arrives here rather than as a departure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A gap names a state the domain should be in rather than an act to take or a reason to act.",
    },
  ],
} as const satisfies DecisionKind
