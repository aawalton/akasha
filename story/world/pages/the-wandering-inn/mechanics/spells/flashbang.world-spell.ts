import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashbang = {
  id: "01a06572-95c4-7a8d-b1b1-90d4ed903444",
  type: "page-type/world-spell",
  slug: "flashbang",
  title: "Flashbang",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.396Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
