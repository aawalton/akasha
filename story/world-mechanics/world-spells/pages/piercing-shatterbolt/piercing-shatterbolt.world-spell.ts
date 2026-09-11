import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const piercingShatterbolt = {
  id: "01a06572-95da-7b44-a444-c2c7d1ce8afb",
  type: "world-spell",
  slug: "piercing-shatterbolt",
  title: "Piercing Shatterbolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
