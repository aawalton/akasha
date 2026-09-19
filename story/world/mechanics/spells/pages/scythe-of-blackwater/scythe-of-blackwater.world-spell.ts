import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const scytheOfBlackwater = {
  id: "01a06572-95df-7ca5-857d-ac6ec552c3a7",
  type: "page-type/world-spell",
  slug: "scythe-of-blackwater",
  title: "Scythe of Blackwater",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
