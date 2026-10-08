import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveSelecteeStatus = {
  id: "01a0e9f3-f5f6-748b-b7c8-bb4c14d3816d",
  type: "page-type/world-condition",
  slug: "super-supportive-selectee-status",
  title: "Pre-affixed Selectee",
  world: "world/super-supportive",
  aliases: ["selectee"],
  description:
    "The status of someone the System has chosen who has not yet accepted the Contract, with a countdown to decide.",
  createdAt: "2026-09-28T21:37:54.678Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldCondition
