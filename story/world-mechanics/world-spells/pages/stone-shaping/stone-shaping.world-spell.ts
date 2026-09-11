import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stoneShaping = {
  id: "01a06572-95e3-7b80-983b-7dd61f89dd48",
  type: "world-spell",
  slug: "stone-shaping",
  title: "Stone Shaping",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
