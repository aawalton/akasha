import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manasourceShield = {
  id: "01a06572-95d1-7727-a6ae-053f72b79cf8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "manasource-shield",
  title: "Manasource Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
