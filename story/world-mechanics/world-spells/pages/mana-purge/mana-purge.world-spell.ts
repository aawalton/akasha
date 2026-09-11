import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaPurge = {
  id: "01a06572-95d1-756b-b69a-54c4c96ada90",
  type: "world-spell",
  slug: "mana-purge",
  title: "Mana Purge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
