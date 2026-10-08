import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const weatherchange = {
  id: "01a06572-95e9-768e-b65d-d3b8131a9b7e",
  type: "page-type/world-spell",
  slug: "weatherchange",
  title: "Weatherchange",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:07.000Z",
} as const satisfies WorldSpell
