import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const vacuumSphere = {
  id: "01a06572-95e8-7bb1-ab68-75d3db1d57f7",
  type: "page-type/world-spell",
  slug: "vacuum-sphere",
  title: "Vacuum Sphere",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.432Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
