import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fiveAlchemiesAnchorage = {
  id: "01a06572-95c3-77a5-bc64-236a5877265a",
  type: "page-type/world-spell",
  slug: "five-alchemies-anchorage",
  title: "Five Alchemies: Anchorage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
