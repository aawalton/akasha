import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const karasDuststorm = {
  id: "01a06572-95cc-7cf1-b9b5-72565165c4a6",
  type: "page-type/world-spell",
  slug: "karas-duststorm",
  title: "Karas Duststorm",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.404Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
