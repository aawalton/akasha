import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereIxPortalAmulet = {
  id: "01a0ea42-1ac1-74f9-918e-c5a976570222",
  type: "page-type/world-item",
  slug: "otherwhere-ix-portal-amulet",
  title: "Portal Amulet",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "An amulet that opens a portal to a set place.",
} as const satisfies WorldItem
