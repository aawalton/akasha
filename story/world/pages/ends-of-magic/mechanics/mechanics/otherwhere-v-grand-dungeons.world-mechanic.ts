import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVGrandDungeons = {
  id: "01a0e9fb-c0e7-7311-a8ec-d9247ca6c8b6",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-grand-dungeons",
  title: "Grand Dungeons",
  world: "world/ends-of-magic",
  aliases: ["Grand Dungeon"],
  description: "The greatest class of dungeon.",
} as const satisfies WorldMechanic
