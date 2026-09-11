import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightningArrow = {
  id: "01a06572-95cf-77d6-8b99-5168b64b5cf0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightning-arrow",
  title: "Lightning Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
