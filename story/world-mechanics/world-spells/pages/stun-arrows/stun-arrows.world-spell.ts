import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const stunArrows = {
  id: "01a06572-95e4-70cf-96d6-a22d06def789",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stun-arrows",
  title: "Stun Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
