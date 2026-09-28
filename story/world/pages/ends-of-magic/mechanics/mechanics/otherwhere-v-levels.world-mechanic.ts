import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVLevels = {
  id: "01a0e9f5-a5d7-7ce0-a37c-2d433bb134b3",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-levels",
  title: "Levels",
  world: "world/ends-of-magic",
  aliases: ["level"],
  description: "A number Davrar gives each class, rising as its holder overcomes challenges.",
} as const satisfies WorldMechanic
