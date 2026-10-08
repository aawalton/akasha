import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massFeatherfall = {
  id: "01a06572-95d1-72f5-b48d-5489bf6cccf2",
  type: "page-type/world-spell",
  slug: "mass-featherfall",
  title: "Mass Featherfall",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
