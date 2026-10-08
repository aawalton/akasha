import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostArrows = {
  id: "01a06572-95c5-7247-a99d-002d6ad0b2fb",
  type: "page-type/world-spell",
  slug: "frost-arrows",
  title: "Frost Arrows",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
