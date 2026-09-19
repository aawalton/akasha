import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bliss = {
  id: "01a06572-95b6-7cf4-ab69-108053db2d35",
  type: "page-type/world-spell",
  slug: "bliss",
  title: "Bliss",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
