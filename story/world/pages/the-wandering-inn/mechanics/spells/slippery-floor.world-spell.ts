import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slipperyFloor = {
  id: "01a06572-95e1-7ea4-af52-6d5d11bd0b79",
  type: "page-type/world-spell",
  slug: "slippery-floor",
  title: "Slippery Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.425Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
