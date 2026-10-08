import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const camouflage = {
  id: "01a06572-95b8-776c-811f-d2114da0f207",
  type: "page-type/world-spell",
  slug: "camouflage",
  title: "Camouflage",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.384Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
