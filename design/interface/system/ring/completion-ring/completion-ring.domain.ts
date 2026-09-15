import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const completionRing = {
  id: "01a0655b-9cdd-7e64-82e6-36eae889890f",
  type: "page-type/domain",
  slug: "completion-ring",
  definition: "how near done a body of work is",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The arc is a full ring less the backlog measured against a recent period's intake.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arc has no floor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Anything past empty draws empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The color comes from how many items are left against the thresholds the feed sends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A feed sending no thresholds has the ring colored by the fraction instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring colored by fraction draws blue at full and green at three quarters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring colored by fraction draws yellow at a half and red at a quarter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring colored by fraction draws black under a quarter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A backlog of nothing draws an emoji in place of the ring.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The words for nothing left sit beneath that emoji or are left unsaid.",
    },
  ],
} as const satisfies Domain
