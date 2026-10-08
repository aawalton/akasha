import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMarleck = {
  id: "01a0e9f4-be68-7583-a0bd-133bf3f35139",
  type: "page-type/world-item",
  slug: "super-supportive-marleck",
  title: "Marleck",
  world: "world/super-supportive",
  aliases: ["marleck berries"],
  description: "A tall shrub with dark green fruit.",
  createdAt: "2026-09-28T21:38:45.992Z",
  updatedAt: "2026-09-28T21:38:49.000Z",
} as const satisfies WorldItem
