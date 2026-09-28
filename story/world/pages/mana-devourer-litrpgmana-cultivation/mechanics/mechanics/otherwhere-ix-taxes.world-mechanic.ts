import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxTaxes = {
  id: "01a0ea35-b313-7d99-9e8c-695c25f392dd",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-taxes",
  title: "Taxes",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "Levies a realm takes from what its people earn.",
} as const satisfies WorldMechanic
