import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxInventory = {
  id: "01a0ea43-e442-78dc-8a20-064d115fb50c",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-inventory",
  title: "Inventory",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "A storage space held within the system, divided into squares.",
} as const satisfies WorldMechanic
