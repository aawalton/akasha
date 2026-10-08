import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpellFireball = {
  id: "01a06572-95b7-7fb9-ae55-496733dcc143",
  type: "page-type/world-spell",
  slug: "bound-spell-fireball",
  title: "Bound Spell: Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.383Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
