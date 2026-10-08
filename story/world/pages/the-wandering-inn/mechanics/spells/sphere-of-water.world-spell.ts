import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sphereOfWater = {
  id: "01a06572-95e2-79dd-9d3f-0076c02747fc",
  type: "page-type/world-spell",
  slug: "sphere-of-water",
  title: "Sphere of Water",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.426Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
