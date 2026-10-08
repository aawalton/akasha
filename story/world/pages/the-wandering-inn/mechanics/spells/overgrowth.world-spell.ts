import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const overgrowth = {
  id: "01a06572-95da-7303-b769-d2b7de1fc703",
  type: "page-type/world-spell",
  slug: "overgrowth",
  title: "Overgrowth",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.418Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
