import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const timeProbePoints = {
  id: "01a1802d-b13e-7139-a018-1f85ec440998",
  type: "page-type/page-type",
  slug: "time-probe-points",
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
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies PageType
