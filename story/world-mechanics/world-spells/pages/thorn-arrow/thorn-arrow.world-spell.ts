import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thornArrow = {
  id: "01a06572-95e6-719b-9e2d-803a2881b6c7",
  type: "world-spell",
  slug: "thorn-arrow",
  title: "Thorn Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
