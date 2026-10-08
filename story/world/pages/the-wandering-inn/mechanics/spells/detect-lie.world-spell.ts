import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectLie = {
  id: "01a06572-95bc-7ecc-b7d4-1dbc586d5758",
  type: "page-type/world-spell",
  slug: "detect-lie",
  title: "Detect Lie",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
