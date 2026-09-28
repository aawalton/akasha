import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveInfogear = {
  id: "01a0e9f4-be67-735f-b098-79d42ce835df",
  type: "page-type/world-item",
  slug: "super-supportive-infogear",
  title: "Infogear",
  world: "world/super-supportive",
  aliases: ["Informant's wearables"],
  description: "Wearable gear that records information in public spaces.",
} as const satisfies WorldItem
