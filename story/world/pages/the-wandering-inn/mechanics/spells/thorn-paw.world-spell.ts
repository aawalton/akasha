import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornPaw = {
  id: "01a06572-95e6-70ce-a675-7e9776508c6c",
  type: "page-type/world-spell",
  slug: "thorn-paw",
  title: "Thorn Paw",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.430Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
