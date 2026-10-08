import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveAskew = {
  id: "01a0e9f3-f5f4-7565-93df-720a72be8806",
  type: "page-type/world-condition",
  slug: "super-supportive-askew",
  title: "Askew",
  world: "world/super-supportive",
  aliases: ["askewness"],
  description:
    "A state of being pushed slightly out of one's natural alignment, felt in one's authority.",
  createdAt: "2026-09-28T21:37:54.676Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldCondition
