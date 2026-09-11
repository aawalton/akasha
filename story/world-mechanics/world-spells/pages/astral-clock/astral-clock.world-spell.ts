import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const astralClock = {
  id: "01a06572-95b5-72d6-840f-7c6095bad901",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "astral-clock",
  title: "Astral Clock",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
