import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spark = {
  id: "01a06572-95e1-7607-9fd5-c507ac1e80b0",
  type: "page-type/world-spell",
  slug: "spark",
  title: "Spark",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
