import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const wallOfFaith = {
  id: "01a0657d-032c-7157-96af-4fe27cd230ce",
  type: "world-skill",
  slug: "wall-of-faith",
  title: "Wall of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
