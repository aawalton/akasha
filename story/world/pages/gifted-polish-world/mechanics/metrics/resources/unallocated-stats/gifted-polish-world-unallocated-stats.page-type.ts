import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const giftedPolishWorldUnallocatedStats = {
  id: "01a18e17-127d-7336-a3fe-c6df4c7dd5a2",
  type: "page-type/page-type",
  slug: "gifted-polish-world-unallocated-stats",
  definition: "the unallocated stats a character in Gifted holds to put into an attribute",
  extends: ["page-type/metric-character-point"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character earns unallocated stats from Paths and Achievements, and puts each into one attribute.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies PageType
