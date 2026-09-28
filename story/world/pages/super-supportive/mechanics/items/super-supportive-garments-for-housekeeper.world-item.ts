import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveGarmentsForHousekeeper = {
  id: "01a0e9f3-f5f6-726a-9844-25276092414c",
  type: "page-type/world-item",
  slug: "super-supportive-garments-for-housekeeper",
  title: "Garments for Housekeeper",
  world: "world/super-supportive",
  description: "A black Wardrobe tunic and pants that give +0.5 Stamina.",
} as const satisfies WorldItem
