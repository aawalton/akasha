import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const beatFlowTestPoints = {
  id: "01a17f7f-6e81-74c5-a9e2-2b8bf7de8492",
  type: "page-type/page-type",
  slug: "beat-flow-test-points",
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
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies PageType
