import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const automaticSpellcasting = {
  id: "01a06572-95b5-7c36-9853-46ff6f068214",
  type: "world-spell",
  slug: "automatic-spellcasting",
  title: "Automatic Spellcasting",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
