import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveDevotionChip = {
  id: "01a0e9fb-2b66-726a-a0a9-cdd659e44931",
  type: "page-type/world-item",
  slug: "super-supportive-devotion-chip",
  title: "Devotion chip",
  world: "world/super-supportive",
  description: "An implant in the cheek that sends random painful shocks as a show of devotion.",
} as const satisfies WorldItem
