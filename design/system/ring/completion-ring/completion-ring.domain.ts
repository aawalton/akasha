import type { Domain } from "akasha/domains/domain.page-type.ts"

export const completionRing = {
  id: "01a0655b-9cdd-7e64-82e6-36eae889890f",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "completion-ring",
  definition: "how near done a body of work is",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The arc is a full ring less the backlog measured against a recent period's intake.",
    },
    {
      invariantKind: "departure",
      statement: "The arc has no floor.",
    },
    {
      invariantKind: "departure",
      statement: "Anything past empty draws empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The color comes from how many items are left against the thresholds the feed sends.",
    },
    {
      invariantKind: "departure",
      statement: "A feed sending no thresholds has the ring colored by the fraction instead.",
    },
    {
      invariantKind: "departure",
      statement: "A ring colored by fraction draws blue at full and green at three quarters.",
    },
    {
      invariantKind: "departure",
      statement: "A ring colored by fraction draws yellow at a half and red at a quarter.",
    },
    {
      invariantKind: "departure",
      statement: "A ring colored by fraction draws black under a quarter.",
    },
    {
      invariantKind: "departure",
      statement: "A backlog of nothing draws an emoji in place of the ring.",
    },
    {
      invariantKind: "departure",
      statement: "The words for nothing left sit beneath that emoji or are left unsaid.",
    },
  ],
} as const satisfies Domain
