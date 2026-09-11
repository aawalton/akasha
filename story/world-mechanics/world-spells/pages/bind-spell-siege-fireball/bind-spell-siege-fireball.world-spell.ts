import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bindSpellSiegeFireball = {
  id: "01a06572-95b6-7893-99b9-372f959ebefc",
  type: "world-spell",
  slug: "bind-spell-siege-fireball",
  title: "Bind Spell: Siege Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
