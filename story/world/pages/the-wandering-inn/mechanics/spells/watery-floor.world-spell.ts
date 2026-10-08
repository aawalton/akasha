import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const wateryFloor = {
  id: "01a06572-95e9-7588-9e3d-2c994946f982",
  type: "page-type/world-spell",
  slug: "watery-floor",
  title: "Watery Floor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.433Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
