import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const absorbLife = {
  id: "01a06572-95b2-7820-b6ff-763517da1a6f",
  type: "page-type/world-spell",
  slug: "absorb-life",
  title: "Absorb Life",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.378Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
