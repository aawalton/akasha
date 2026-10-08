import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightedArrow = {
  id: "01a06572-95cf-7fc7-aef0-b4c120b72e9c",
  type: "page-type/world-spell",
  slug: "lighted-arrow",
  title: "Lighted Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.407Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
