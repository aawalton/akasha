import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const spellHoming = {
  id: "01a06572-95e2-78f1-b6b5-0fa9683ce49f",
  type: "world-spell",
  slug: "spell-homing",
  title: "Spell: Homing",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
