import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneWall = {
  id: "01a06572-95e3-706c-8f1d-64c0c53a2d3f",
  type: "page-type/world-spell",
  slug: "stone-wall",
  title: "Stone Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
