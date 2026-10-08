import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceSpray = {
  id: "01a06572-95ca-79fb-9e45-48daee0b389f",
  type: "page-type/world-spell",
  slug: "ice-spray",
  title: "Ice Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.402Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
