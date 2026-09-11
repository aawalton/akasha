import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const invisibleArrow = {
  id: "01a06572-95cc-73b5-a1a1-5f154d02b9cf",
  type: "world-spell",
  slug: "invisible-arrow",
  title: "Invisible Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
