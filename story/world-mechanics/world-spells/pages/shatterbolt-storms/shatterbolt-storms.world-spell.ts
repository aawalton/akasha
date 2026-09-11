import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const shatterboltStorms = {
  id: "01a06572-95df-7dca-bddf-f1b0c3f1f31e",
  type: "world-spell",
  slug: "shatterbolt-storms",
  title: "Shatterbolt Storms",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
