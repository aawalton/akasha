import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pathsSheetCheckPoints = {
  id: "01a182db-5bf2-7703-bdcd-81dc82390d2b",
  type: "page-type/page-type",
  slug: "paths-sheet-check-points",
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
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies PageType
