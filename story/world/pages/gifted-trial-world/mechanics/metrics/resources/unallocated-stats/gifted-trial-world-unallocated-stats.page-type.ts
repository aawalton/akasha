import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const giftedTrialWorldUnallocatedStats = {
  id: "01a18d10-93f1-76d1-ad21-ebeeb24eff57",
  type: "page-type/page-type",
  slug: "gifted-trial-world-unallocated-stats",
  definition:
    "the unallocated stats a character in GiftedTrialWorld holds to put into an attribute",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies PageType
