import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const timeCheck = {
  id: "01a06572-95e7-7b2c-8d5b-2dfbb7e2a201",
  type: "world-spell",
  slug: "time-check",
  title: "Time Check",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
