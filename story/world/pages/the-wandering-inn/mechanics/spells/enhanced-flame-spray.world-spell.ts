import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const enhancedFlameSpray = {
  id: "01a06572-95bf-70d2-9294-7e46e315b276",
  type: "page-type/world-spell",
  slug: "enhanced-flame-spray",
  title: "Enhanced Flame Spray",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
