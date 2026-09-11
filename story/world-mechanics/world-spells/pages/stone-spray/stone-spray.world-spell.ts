import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneSpray = {
  id: "01a06572-95e3-7595-9fc4-70c5e4019bb1",
  type: "world-spell",
  slug: "stone-spray",
  title: "Stone Spray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
