import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const waterArrows = {
  id: "01a06572-95e9-7c7c-8d51-011727de012f",
  type: "page-type/world-spell",
  slug: "water-arrows",
  title: "Water Arrows",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
