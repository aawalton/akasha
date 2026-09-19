import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const grasshopperSRun = {
  id: "01a06575-9816-7207-96d6-76959b93235b",
  type: "page-type/world-skill",
  slug: "grasshopper-s-run",
  title: "Grasshopper’s Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
