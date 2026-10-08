import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveMandatoryLeave = {
  id: "01a0e9f3-f5f5-7394-bcaf-38ef974bb263",
  type: "page-type/world-condition",
  slug: "super-supportive-mandatory-leave",
  title: "Mandatory leave",
  world: "world/super-supportive",
  aliases: ["leave"],
  description: "A leave logged with the System that blocks all quests for its length.",
  createdAt: "2026-09-28T21:37:54.677Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldCondition
