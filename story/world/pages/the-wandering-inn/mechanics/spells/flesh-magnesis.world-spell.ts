import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fleshMagnesis = {
  id: "01a06572-95c4-7ac1-8b5c-eaee22382c8a",
  type: "page-type/world-spell",
  slug: "flesh-magnesis",
  title: "Flesh Magnesis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
