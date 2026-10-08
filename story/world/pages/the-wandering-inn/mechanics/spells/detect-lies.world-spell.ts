import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectLies = {
  id: "01a06572-95bd-706f-a2fb-82b261cfdfda",
  type: "page-type/world-spell",
  slug: "detect-lies",
  title: "Detect Lies",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
