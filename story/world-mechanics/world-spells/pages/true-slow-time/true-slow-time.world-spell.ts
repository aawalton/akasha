import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const trueSlowTime = {
  id: "01a06572-95e7-7241-bcd3-d93aac5df5c8",
  type: "world-spell",
  slug: "true-slow-time",
  title: "True Slow Time",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
