import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthquake = {
  id: "01a06572-95bf-7955-84ac-da2026dc9028",
  type: "page-type/world-spell",
  slug: "earthquake",
  title: "Earthquake",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.391Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
