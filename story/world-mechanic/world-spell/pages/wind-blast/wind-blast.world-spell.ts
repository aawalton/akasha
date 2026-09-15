import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const windBlast = {
  id: "01a06572-95ea-7f79-8dbf-41cf095e0cc1",
  type: "page-type/world-spell",
  slug: "wind-blast",
  title: "Wind Blast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
