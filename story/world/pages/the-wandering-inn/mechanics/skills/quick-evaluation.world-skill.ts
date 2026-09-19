import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickEvaluation = {
  id: "01a0657d-029b-7365-84bc-74ce0efc85b0",
  type: "page-type/world-skill",
  slug: "quick-evaluation",
  title: "Quick Evaluation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
