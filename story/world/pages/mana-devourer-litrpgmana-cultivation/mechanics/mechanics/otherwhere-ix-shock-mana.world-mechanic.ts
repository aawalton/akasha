import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxShockMana = {
  id: "01a0ea44-96bd-788a-a853-2eeba80a4a59",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-shock-mana",
  title: "Shock Mana",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["lightning mana"],
  description: "The kind of mana that carries lightning.",
} as const satisfies WorldMechanic
