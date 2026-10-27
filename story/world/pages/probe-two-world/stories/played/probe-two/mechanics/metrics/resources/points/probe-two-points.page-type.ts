import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const probeTwoPoints = {
  id: "01a17fbf-aff5-7a32-be61-6163acbee10b",
  type: "page-type/page-type",
  slug: "probe-two-points",
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
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies PageType
