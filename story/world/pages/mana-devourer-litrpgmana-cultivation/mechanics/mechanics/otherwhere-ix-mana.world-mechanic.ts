import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxMana = {
  id: "01a0ea35-1213-718b-81ff-147bacaf2052",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-mana",
  title: "Mana",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["mana core", "mana kinds"],
  description: "The energy that runs through all things and powers magic.",
} as const satisfies WorldMechanic
