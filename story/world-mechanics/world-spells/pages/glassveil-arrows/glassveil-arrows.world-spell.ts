import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const glassveilArrows = {
  id: "01a06572-95c6-7600-b7f4-12b97a05b1e4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "glassveil-arrows",
  title: "Glassveil Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
