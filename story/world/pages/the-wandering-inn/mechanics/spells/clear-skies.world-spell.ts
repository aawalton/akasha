import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const clearSkies = {
  id: "01a06572-95b9-72a3-850d-e7d880000cab",
  type: "page-type/world-spell",
  slug: "clear-skies",
  title: "Clear Skies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
