import type { Domain } from "../../domains/domains/domain.page-type.ts"

export const personaDayScore = {
  id: "01a0675b-16f7-7934-860f-30346687b95a",
  pageTypeSlug: "domain",
  slug: "persona-day-score",
  definition: "what one persona is worth on one day",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A persona day states its own points, computed from the formula its property declares.",
    },
    {
      invariantKind: "departure",
      statement: "Active calories already sit inside a persona day's points.",
    },
    {
      invariantKind: "departure",
      statement: "Replacing a day's active calories moves that day's points by the difference.",
    },
  ],
} as const satisfies Domain
