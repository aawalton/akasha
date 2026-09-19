import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bikeSmoothRollRoughTerrain = {
  id: "01a06575-97f5-727d-a493-d438b7c0c15b",
  type: "page-type/world-skill",
  slug: "bike-smooth-roll-rough-terrain",
  title: "Bike: Smooth Roll (Rough Terrain)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
