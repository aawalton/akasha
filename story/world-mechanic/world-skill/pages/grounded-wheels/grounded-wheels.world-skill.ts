import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const groundedWheels = {
  id: "01a06575-9817-7af1-a766-8d80bc02d38b",
  type: "world-skill",
  slug: "grounded-wheels",
  title: "Grounded Wheels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
