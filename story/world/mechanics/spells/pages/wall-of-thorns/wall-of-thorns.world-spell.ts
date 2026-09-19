import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfThorns = {
  id: "01a06572-95e9-7a7a-a1f2-bf7b4e7f8321",
  type: "page-type/world-spell",
  slug: "wall-of-thorns",
  title: "Wall of Thorns",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
