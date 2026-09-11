import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneArrows = {
  id: "01a06572-95e3-71ad-ad3f-2489cea6b66a",
  type: "world-spell",
  slug: "stone-arrows",
  title: "Stone Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
