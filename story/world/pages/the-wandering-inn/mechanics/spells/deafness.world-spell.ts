import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const deafness = {
  id: "01a06572-95bb-7bb5-8df0-acf8b22be30a",
  type: "page-type/world-spell",
  slug: "deafness",
  title: "Deafness",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
