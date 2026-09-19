import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const parallelThinking = {
  id: "01a0657d-0286-740b-949b-b8bed2d99c88",
  type: "page-type/world-skill",
  slug: "parallel-thinking",
  title: "Parallel Thinking",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
