import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneSpear = {
  id: "01a06572-95e3-70df-b438-b975f4967ebd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-spear",
  title: "Stone Spear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
