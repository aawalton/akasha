import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const farSight = {
  id: "01a06572-95c0-70ac-a028-a8da021cc2e7",
  type: "page-type/world-spell",
  slug: "far-sight",
  title: "Far Sight",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
