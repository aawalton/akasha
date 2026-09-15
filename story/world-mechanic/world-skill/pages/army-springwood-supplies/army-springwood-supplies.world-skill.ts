import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const armySpringwoodSupplies = {
  id: "01a06575-97ed-7e34-b9aa-452a6beea52f",
  type: "world-skill",
  slug: "army-springwood-supplies",
  title: "Army: Springwood Supplies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
