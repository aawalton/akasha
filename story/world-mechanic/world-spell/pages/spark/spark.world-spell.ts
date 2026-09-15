import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const spark = {
  id: "01a06572-95e1-7607-9fd5-c507ac1e80b0",
  type: "world-spell",
  slug: "spark",
  title: "Spark",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
