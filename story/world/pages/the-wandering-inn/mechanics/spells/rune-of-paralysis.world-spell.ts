import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const runeOfParalysis = {
  id: "01a06572-95de-75b0-854b-b5daf3bec86b",
  type: "page-type/world-spell",
  slug: "rune-of-paralysis",
  title: "Rune of Paralysis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
