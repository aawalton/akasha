import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bindSpellOrbOfAir = {
  id: "01a06572-95b6-7915-8ca2-eca9ebeb0b36",
  type: "world-spell",
  slug: "bind-spell-orb-of-air",
  title: "Bind Spell: Orb of Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
