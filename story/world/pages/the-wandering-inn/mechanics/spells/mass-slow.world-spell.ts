import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massSlow = {
  id: "01a06572-95d2-7a7e-bbfc-0584e12ac3f3",
  type: "page-type/world-spell",
  slug: "mass-slow",
  title: "Mass Slow",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
