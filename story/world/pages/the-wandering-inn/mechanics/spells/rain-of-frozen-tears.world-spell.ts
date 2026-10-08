import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rainOfFrozenTears = {
  id: "01a06572-95dc-7f7e-a5c5-f6dd799d16bc",
  type: "page-type/world-spell",
  slug: "rain-of-frozen-tears",
  title: "Rain of Frozen Tears",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
