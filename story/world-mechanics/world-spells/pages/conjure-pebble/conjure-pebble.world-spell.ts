import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const conjurePebble = {
  id: "01a06572-95ba-7141-b9a8-984f38c1de11",
  type: "world-spell",
  slug: "conjure-pebble",
  title: "Conjure Pebble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
