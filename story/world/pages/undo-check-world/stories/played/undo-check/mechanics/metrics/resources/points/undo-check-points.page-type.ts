import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const undoCheckPoints = {
  id: "01a18309-e114-757d-95b0-00672c3634e9",
  type: "page-type/page-type",
  slug: "undo-check-points",
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
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies PageType
