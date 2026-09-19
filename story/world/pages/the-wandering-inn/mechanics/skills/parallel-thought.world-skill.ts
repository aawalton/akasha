import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const parallelThought = {
  id: "01a0657d-0286-7605-b5d5-d81b149e2ca4",
  type: "page-type/world-skill",
  slug: "parallel-thought",
  title: "Parallel Thought",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
