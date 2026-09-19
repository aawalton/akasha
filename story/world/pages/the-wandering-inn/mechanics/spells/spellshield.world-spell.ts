import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spellshield = {
  id: "01a06572-95e2-7130-bf27-8bda785487b7",
  type: "page-type/world-spell",
  slug: "spellshield",
  title: "Spellshield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
