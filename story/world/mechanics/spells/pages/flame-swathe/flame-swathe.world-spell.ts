import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flameSwathe = {
  id: "01a06572-95c3-7553-8d33-094762383c05",
  type: "page-type/world-spell",
  slug: "flame-swathe",
  title: "Flame Swathe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
