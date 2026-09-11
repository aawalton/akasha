import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const boundSpellFireball = {
  id: "01a06572-95b7-7fb9-ae55-496733dcc143",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bound-spell-fireball",
  title: "Bound Spell: Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
