import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const conjureStickyPebble = {
  id: "01a06572-95ba-79a1-a8ad-3e27aeafa353",
  type: "page-type/world-spell",
  slug: "conjure-sticky-pebble",
  title: "Conjure Sticky Pebble",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
