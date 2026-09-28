import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxFrostMana = {
  id: "01a0ea43-a2d1-715b-89d3-9c17967917f7",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-frost-mana",
  title: "Frost Mana",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["Ice Mana"],
  description: "The kind of mana that carries cold and ice.",
} as const satisfies WorldMechanic
