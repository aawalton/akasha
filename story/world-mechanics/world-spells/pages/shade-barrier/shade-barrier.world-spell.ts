import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shadeBarrier = {
  id: "01a06572-95df-7423-b4e9-58dba117718a",
  type: "world-spell",
  slug: "shade-barrier",
  title: "Shade Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
