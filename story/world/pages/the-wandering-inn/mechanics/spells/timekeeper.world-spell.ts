import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const timekeeper = {
  id: "01a06572-95e7-798d-88e9-89e571b1f2d2",
  type: "page-type/world-spell",
  slug: "timekeeper",
  title: "Timekeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
