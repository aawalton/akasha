import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const unlockDoor = {
  id: "01a06572-95e8-753a-aaec-d5ce2f68276c",
  type: "page-type/world-spell",
  slug: "unlock-door",
  title: "Unlock Door",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
