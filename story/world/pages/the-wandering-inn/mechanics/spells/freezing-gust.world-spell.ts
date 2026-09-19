import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const freezingGust = {
  id: "01a06572-95c5-78a8-8efd-beed3ccd16fc",
  type: "page-type/world-spell",
  slug: "freezing-gust",
  title: "Freezing Gust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
