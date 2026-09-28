import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxSpellcasting = {
  id: "01a0ea3b-8048-7d49-b790-2cb245ff8504",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-spellcasting",
  title: "Spellcasting",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["spells", "conduits", "runes", "rune tattoos", "incantations"],
  description: "Working magic through learned spells, conduits, runes and spoken words.",
} as const satisfies WorldMechanic
