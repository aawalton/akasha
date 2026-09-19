import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const alterSpell = {
  id: "01a06572-95b4-7dca-b5f3-b87544258c11",
  type: "page-type/world-spell",
  slug: "alter-spell",
  title: "Alter Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
