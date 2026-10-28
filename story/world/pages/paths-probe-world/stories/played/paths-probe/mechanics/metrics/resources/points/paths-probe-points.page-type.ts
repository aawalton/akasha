import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pathsProbePoints = {
  id: "01a18008-7533-7ea8-a718-4fdfbbdaf697",
  type: "page-type/page-type",
  slug: "paths-probe-points",
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
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies PageType
