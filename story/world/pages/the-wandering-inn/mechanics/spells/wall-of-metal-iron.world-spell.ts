import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfMetalIron = {
  id: "01a06572-95e9-77e9-b605-b84a4b4de846",
  type: "page-type/world-spell",
  slug: "wall-of-metal-iron",
  title: "Wall of Metal: Iron",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
