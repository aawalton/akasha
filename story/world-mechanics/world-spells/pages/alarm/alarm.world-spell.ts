import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const alarm = {
  id: "01a06572-95b3-7788-9cfc-3a9cfeaf75a4",
  type: "world-spell",
  slug: "alarm",
  title: "Alarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
