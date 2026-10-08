import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfLight = {
  id: "01a06572-95e9-7cb0-8154-924f003991d0",
  type: "page-type/world-spell",
  slug: "wall-of-light",
  title: "Wall of Light",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
