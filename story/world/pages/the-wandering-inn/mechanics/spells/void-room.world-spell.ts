import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidRoom = {
  id: "01a06572-95e8-7a2d-a6f8-1184af7d644a",
  type: "page-type/world-spell",
  slug: "void-room",
  title: "Void Room",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
