import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windBlast = {
  id: "01a06572-95ea-7f79-8dbf-41cf095e0cc1",
  type: "page-type/world-spell",
  slug: "wind-blast",
  title: "Wind Blast",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.434Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
