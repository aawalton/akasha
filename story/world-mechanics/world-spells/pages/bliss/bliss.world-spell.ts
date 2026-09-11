import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bliss = {
  id: "01a06572-95b6-7cf4-ab69-108053db2d35",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "bliss",
  title: "Bliss",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
