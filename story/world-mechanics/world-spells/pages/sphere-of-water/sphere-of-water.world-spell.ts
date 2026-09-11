import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sphereOfWater = {
  id: "01a06572-95e2-79dd-9d3f-0076c02747fc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sphere-of-water",
  title: "Sphere of Water",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
