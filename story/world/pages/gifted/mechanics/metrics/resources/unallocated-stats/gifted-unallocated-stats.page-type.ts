import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const giftedUnallocatedStats = {
  id: "01a17ede-cda6-7931-879e-9e0437dff415",
  type: "page-type/page-type",
  slug: "gifted-unallocated-stats",
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
  createdAt: "2026-10-27T19:38:13.285Z",
  updatedAt: "2026-10-27T19:38:13.285Z",
} as const satisfies PageType
