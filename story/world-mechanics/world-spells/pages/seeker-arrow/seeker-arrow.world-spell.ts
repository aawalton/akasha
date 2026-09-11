import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const seekerArrow = {
  id: "01a06572-95df-7faf-bb4d-1f0b6260e0bb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "seeker-arrow",
  title: "Seeker Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
