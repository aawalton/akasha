import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const expandSpell = {
  id: "01a06572-95bf-7e4d-92ff-95332d5945fd",
  type: "world-spell",
  slug: "expand-spell",
  title: "Expand Spell",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
