import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTemperSphere = {
  id: "01a0e9f3-f5f7-7910-a905-97b0e14591be",
  type: "page-type/world-item",
  slug: "super-supportive-temper-sphere",
  title: "Temper sphere",
  world: "world/super-supportive",
  aliases: ["banshee orb"],
  description: "A glass ball half full of glittering sand with a network of enchantments.",
} as const satisfies WorldItem
