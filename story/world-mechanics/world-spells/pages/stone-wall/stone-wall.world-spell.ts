import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneWall = {
  id: "01a06572-95e3-706c-8f1d-64c0c53a2d3f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-wall",
  title: "Stone Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
