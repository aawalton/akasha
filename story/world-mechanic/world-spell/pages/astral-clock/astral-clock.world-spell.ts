import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const astralClock = {
  id: "01a06572-95b5-72d6-840f-7c6095bad901",
  type: "world-spell",
  slug: "astral-clock",
  title: "Astral Clock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
