import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const depthExplosion = {
  id: "01a06572-95bc-7a62-8557-bd28bd43930c",
  type: "page-type/world-spell",
  slug: "depth-explosion",
  title: "Depth Explosion",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
