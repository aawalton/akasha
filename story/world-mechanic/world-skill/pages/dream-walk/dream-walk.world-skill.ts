import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const dreamWalk = {
  id: "01a06575-9805-7f12-9eb8-29fd314609d0",
  type: "world-skill",
  slug: "dream-walk",
  title: "Dream Walk",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
