import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostbody = {
  id: "01a06572-95c5-7083-bd8b-a32898b8c625",
  type: "world-spell",
  slug: "frostbody",
  title: "Frostbody",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
