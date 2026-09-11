import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const timeSlow = {
  id: "01a06572-95e7-72fa-9d7f-cb794f82a9c3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "time-slow",
  title: "Time Slow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
