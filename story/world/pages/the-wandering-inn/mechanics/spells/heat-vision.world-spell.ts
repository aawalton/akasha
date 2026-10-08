import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const heatVision = {
  id: "01a06572-95c8-7c0b-a651-0792edced115",
  type: "page-type/world-spell",
  slug: "heat-vision",
  title: "Heat Vision",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.400Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
