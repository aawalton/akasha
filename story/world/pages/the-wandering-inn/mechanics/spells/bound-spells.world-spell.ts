import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const boundSpells = {
  id: "01a06572-95b7-70f7-910b-eabd7d105243",
  type: "page-type/world-spell",
  slug: "bound-spells",
  title: "Bound Spells",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
