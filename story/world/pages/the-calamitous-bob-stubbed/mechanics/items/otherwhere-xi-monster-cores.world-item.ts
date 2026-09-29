import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXiMonsterCores = {
  id: "01a0ea83-eafb-776d-b1b1-f928f90ca4d6",
  type: "page-type/world-item",
  slug: "otherwhere-xi-monster-cores",
  title: "Monster Cores",
  world: "world/the-calamitous-bob-stubbed",
  description: "A weightless, perfect sphere of mana taken from a slain beast.",
} as const satisfies WorldItem
