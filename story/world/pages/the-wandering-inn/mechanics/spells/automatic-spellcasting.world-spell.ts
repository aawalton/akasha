import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const automaticSpellcasting = {
  id: "01a06572-95b5-7c36-9853-46ff6f068214",
  type: "page-type/world-spell",
  slug: "automatic-spellcasting",
  title: "Automatic Spellcasting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
