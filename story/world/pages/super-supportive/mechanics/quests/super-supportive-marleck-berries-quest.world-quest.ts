import type { WorldQuest } from "akasha/story/world/mechanics/quests/world-quest.page-type.types.ts"

export const superSupportiveMarleckBerriesQuest = {
  id: "01a0e9f0-79f4-74b9-9d7d-7351426d3fa2",
  type: "page-type/world-quest",
  slug: "super-supportive-marleck-berries-quest",
  title: "Teleport to Elepta Agricultural Community, Moon Thegund, and collect marleck berries",
  world: "world/super-supportive",
  aliases: ["berry quest", "berry picking"],
  description: "A quest to go to a Moon Thegund farm and collect marleck berries.",
} as const satisfies WorldQuest
