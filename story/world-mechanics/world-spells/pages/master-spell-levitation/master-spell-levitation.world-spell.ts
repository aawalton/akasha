import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const masterSpellLevitation = {
  id: "01a06572-95d2-7ef7-bba7-9cec72f12085",
  type: "world-spell",
  slug: "master-spell-levitation",
  title: "Master Spell: Levitation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
