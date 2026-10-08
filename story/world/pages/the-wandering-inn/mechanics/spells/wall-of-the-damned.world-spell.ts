import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wallOfTheDamned = {
  id: "01a06572-95e9-75d8-a63f-089e1a206535",
  type: "page-type/world-spell",
  slug: "wall-of-the-damned",
  title: "Wall of the Damned",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
