import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportivePotionInhaler = {
  id: "01a0e9fc-0701-72d5-bf09-9d9c43379d12",
  type: "page-type/world-item",
  slug: "super-supportive-potion-inhaler",
  title: "Potion inhaler",
  world: "world/super-supportive",
  aliases: ["inhaler"],
  description: "An inhaler holding a potion.",
  createdAt: "2026-09-28T21:46:43.329Z",
  updatedAt: "2026-09-28T22:05:16.000Z",
} as const satisfies WorldItem
