import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpellSpearOfLight = {
  id: "01a06572-95b7-73c3-b960-82d721880081",
  type: "page-type/world-spell",
  slug: "bound-spell-spear-of-light",
  title: "Bound Spell: Spear of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
