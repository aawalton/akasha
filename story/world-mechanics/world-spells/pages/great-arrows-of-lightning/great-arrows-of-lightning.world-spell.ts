import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greatArrowsOfLightning = {
  id: "01a06572-95c7-7a39-9c11-bfe3f7c4cb96",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "great-arrows-of-lightning",
  title: "Great Arrows of Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
