import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bindSpellSiegeFireball = {
  id: "01a06572-95b6-7893-99b9-372f959ebefc",
  type: "page-type/world-spell",
  slug: "bind-spell-siege-fireball",
  title: "Bind Spell: Siege Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
