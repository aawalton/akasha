import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const beamOfZillac = {
  id: "01a06572-95b5-797c-8c8b-281ee331abbe",
  type: "world-spell",
  slug: "beam-of-zillac",
  title: "Beam of Zillac",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
