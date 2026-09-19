import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellAegisOfTheWyrmQueen = {
  id: "01a06572-95e2-70d5-b78a-a47fd9eab330",
  type: "page-type/world-spell",
  slug: "spell-aegis-of-the-wyrm-queen",
  title: "Spell-Aegis of the Wyrm Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
