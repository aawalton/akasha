import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const trueSight = {
  id: "01a06572-95e7-7672-9ae4-de893a9175e9",
  type: "world-spell",
  slug: "true-sight",
  title: "True Sight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
