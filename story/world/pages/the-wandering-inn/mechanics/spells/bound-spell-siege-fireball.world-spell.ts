import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpellSiegeFireball = {
  id: "01a06572-95b7-7a01-8d57-01594edd8a66",
  type: "page-type/world-spell",
  slug: "bound-spell-siege-fireball",
  title: "Bound Spell: Siege Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
