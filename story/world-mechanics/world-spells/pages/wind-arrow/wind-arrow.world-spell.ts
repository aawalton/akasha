import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const windArrow = {
  id: "01a06572-95ea-7e7d-90cc-1603eb35487e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "wind-arrow",
  title: "Wind Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
