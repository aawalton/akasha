import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterSpellshield = {
  id: "01a06572-95c7-7ee1-bc99-f9b9fcef7184",
  type: "page-type/world-spell",
  slug: "greater-spellshield",
  title: "Greater Spellshield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
