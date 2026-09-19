import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpellAgeOfFrost = {
  id: "01a06572-95b7-7bcc-b222-1ddc8c564aaa",
  type: "page-type/world-spell",
  slug: "bound-spell-age-of-frost",
  title: "Bound Spell: Age of Frost",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
