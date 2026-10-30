import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const giftedTrial2WorldUnallocatedStats = {
  id: "01a18dab-06cc-75b3-b16d-7e6efd1f040e",
  type: "page-type/page-type",
  slug: "gifted-trial2-world-unallocated-stats",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies PageType
