import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const memoCheckPoints = {
  id: "01a1832d-38c0-7497-a2a6-c29da2ba9d4c",
  type: "page-type/page-type",
  slug: "memo-check-points",
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
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies PageType
