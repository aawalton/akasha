import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicalCompass = {
  id: "01a06572-95d1-78ac-874d-d23b33fccb95",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magical-compass",
  title: "Magical Compass",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
