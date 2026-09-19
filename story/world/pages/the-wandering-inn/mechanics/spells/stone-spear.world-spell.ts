import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSpear = {
  id: "01a06572-95e3-70df-b438-b975f4967ebd",
  type: "page-type/world-spell",
  slug: "stone-spear",
  title: "Stone Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
