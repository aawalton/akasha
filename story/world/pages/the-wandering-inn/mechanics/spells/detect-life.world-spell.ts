import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectLife = {
  id: "01a06572-95bd-7aea-9427-27c879b877b3",
  type: "page-type/world-spell",
  slug: "detect-life",
  title: "Detect Life",
  world: "world/the-wandering-inn",
  appearanceCount: 40,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
