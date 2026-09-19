import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaPurge = {
  id: "01a06572-95d1-756b-b69a-54c4c96ada90",
  type: "page-type/world-spell",
  slug: "mana-purge",
  title: "Mana Purge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
