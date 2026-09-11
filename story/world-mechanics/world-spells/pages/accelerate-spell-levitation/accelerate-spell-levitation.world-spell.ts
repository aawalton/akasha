import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const accelerateSpellLevitation = {
  id: "01a06572-95b3-7069-93f9-273dbb3c3186",
  type: "world-spell",
  slug: "accelerate-spell-levitation",
  title: "Accelerate Spell: Levitation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
