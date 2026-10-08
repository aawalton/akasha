import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const muffle = {
  id: "01a06572-95d9-74c0-bc98-ba2d3f895dd6",
  type: "page-type/world-spell",
  slug: "muffle",
  title: "Muffle",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.417Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
