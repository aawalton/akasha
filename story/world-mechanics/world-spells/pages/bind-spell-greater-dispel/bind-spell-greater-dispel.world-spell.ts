import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bindSpellGreaterDispel = {
  id: "01a06572-95b6-7147-b1ec-49a5f381757f",
  type: "world-spell",
  slug: "bind-spell-greater-dispel",
  title: "Bind Spell: Greater Dispel",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
