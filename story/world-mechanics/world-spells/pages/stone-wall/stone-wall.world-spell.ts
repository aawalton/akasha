import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneWall = {
  id: "01a06572-95e3-706c-8f1d-64c0c53a2d3f",
  pageTypeSlug: "world-spell",
  slug: "stone-wall",
  title: "Stone Wall",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
