import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const poisonArrow = {
  id: "01a06572-95db-7ca2-9651-0ad9ce8f68ca",
  type: "page-type/world-spell",
  slug: "poison-arrow",
  title: "Poison Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
