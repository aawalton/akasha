import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireballs = {
  id: "01a06572-95c2-7ff7-a086-7947ceb8b7bc",
  type: "page-type/world-spell",
  slug: "fireballs",
  title: "Fireballs",
  world: "world/the-wandering-inn",
  appearanceCount: 104,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.394Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
