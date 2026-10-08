import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const steelcage = {
  id: "01a06572-95e2-76a5-9d2b-cfaf1610011d",
  type: "page-type/world-spell",
  slug: "steelcage",
  title: "Steelcage",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
