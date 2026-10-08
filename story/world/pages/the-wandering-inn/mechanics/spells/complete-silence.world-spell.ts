import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const completeSilence = {
  id: "01a06572-95b9-7c61-8559-3b2e21b63d76",
  type: "page-type/world-spell",
  slug: "complete-silence",
  title: "Complete Silence",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.385Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
