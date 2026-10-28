import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const outcomeCardTrialPoints = {
  id: "01a183ae-dc71-7983-aaed-43c073a83615",
  type: "page-type/page-type",
  slug: "outcome-card-trial-points",
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
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies PageType
