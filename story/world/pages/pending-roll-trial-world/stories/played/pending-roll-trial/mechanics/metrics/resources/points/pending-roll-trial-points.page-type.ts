import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pendingRollTrialPoints = {
  id: "01a183cf-b828-7312-85be-2b8c267a55c9",
  type: "page-type/page-type",
  slug: "pending-roll-trial-points",
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
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies PageType
