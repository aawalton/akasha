import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const outcomeCardsCheckPoints = {
  id: "01a17ffe-7d81-7f52-a722-564bf6b08714",
  type: "page-type/page-type",
  slug: "outcome-cards-check-points",
  definition: "the unspent attribute points a character in the test story holds",
  extends: ["page-type/metric-character-point"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character earns attribute points on a level up, and spends each on one stat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies PageType
