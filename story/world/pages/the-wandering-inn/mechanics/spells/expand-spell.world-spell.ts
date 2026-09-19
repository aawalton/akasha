import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const expandSpell = {
  id: "01a06572-95bf-7e4d-92ff-95332d5945fd",
  type: "page-type/world-spell",
  slug: "expand-spell",
  title: "Expand Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
