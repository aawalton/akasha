import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fortressOfTheIceQueen = {
  id: "01a06572-95c5-7b81-baa9-932e8afe5106",
  type: "page-type/world-spell",
  slug: "fortress-of-the-ice-queen",
  title: "Fortress of the Ice Queen",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
