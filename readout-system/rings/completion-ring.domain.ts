import type { Domain } from "@akasha/domains/domain"

export const completionRing = {
  id: "01a0655b-9cdd-7e64-82e6-36eae889890f",
  pageTypeSlug: "domain",
  slug: "completion-ring",
  definition: "how near done a body of work is",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The arc is what is full less the backlog measured against a recent period's intake.",
    },
    {
      invariantKind: "departure",
      statement: "The arc has no floor, and anything past empty draws empty.",
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
      statement:
        "Colored by fraction, full draws blue, three quarters green, a half yellow, a quarter red.",
    },
    {
      invariantKind: "departure",
      statement: "Colored by fraction, anything under a quarter draws black.",
    },
    {
      invariantKind: "departure",
      statement: "A backlog of nothing draws an emoji in place of the ring.",
    },
    {
      invariantKind: "departure",
      statement: "The words for nothing left stand beneath that emoji, or none do.",
    },
  ],
} as const satisfies Domain
