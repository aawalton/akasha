import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scried = {
  id: "01a06572-95de-7cfa-bb9c-67963cac084f",
  type: "page-type/world-spell",
  slug: "scried",
  title: "Scried",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
