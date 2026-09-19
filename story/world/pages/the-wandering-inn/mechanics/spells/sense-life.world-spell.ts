import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const senseLife = {
  id: "01a06572-95df-7d19-ae6f-968d7f2757ae",
  type: "page-type/world-spell",
  slug: "sense-life",
  title: "Sense Life",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
