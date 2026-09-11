import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonLesserFrostElemental = {
  id: "01a06572-95e4-750a-8a51-5f0f8a32e68a",
  type: "world-spell",
  slug: "summon-lesser-frost-elemental",
  title: "Summon Lesser Frost Elemental",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
