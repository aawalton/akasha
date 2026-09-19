import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickAssessment = {
  id: "01a0657d-029b-7f0d-a8c7-a60fa01edd30",
  type: "page-type/world-skill",
  slug: "quick-assessment",
  title: "Quick Assessment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
