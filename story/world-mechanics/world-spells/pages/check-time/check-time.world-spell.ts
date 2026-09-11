import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const checkTime = {
  id: "01a06572-95b9-7c92-8f14-174982877792",
  type: "world-spell",
  slug: "check-time",
  title: "Check Time",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
