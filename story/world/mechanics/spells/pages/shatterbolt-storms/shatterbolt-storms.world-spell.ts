import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const shatterboltStorms = {
  id: "01a06572-95df-7dca-bddf-f1b0c3f1f31e",
  type: "page-type/world-spell",
  slug: "shatterbolt-storms",
  title: "Shatterbolt Storms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
