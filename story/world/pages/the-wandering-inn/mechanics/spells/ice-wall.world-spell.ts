import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceWall = {
  id: "01a06572-95ca-7c86-9706-06d8ea78e8ee",
  type: "page-type/world-spell",
  slug: "ice-wall",
  title: "Ice Wall",
  world: "world/the-wandering-inn",
  appearanceCount: 47,
  aliases: ["Ice Wall!"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.402Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
