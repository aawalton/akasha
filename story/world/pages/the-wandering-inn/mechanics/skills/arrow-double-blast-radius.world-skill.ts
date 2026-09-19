import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowDoubleBlastRadius = {
  id: "01a06575-97ed-767b-aecc-d9240bf7ba3c",
  type: "page-type/world-skill",
  slug: "arrow-double-blast-radius",
  title: "Arrow: Double Blast Radius",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
