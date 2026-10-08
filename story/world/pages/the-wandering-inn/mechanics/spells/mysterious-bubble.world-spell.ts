import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mysteriousBubble = {
  id: "01a06572-95d9-7ffd-aab6-40ec0c77efa3",
  type: "page-type/world-spell",
  slug: "mysterious-bubble",
  title: "Mysterious Bubble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
