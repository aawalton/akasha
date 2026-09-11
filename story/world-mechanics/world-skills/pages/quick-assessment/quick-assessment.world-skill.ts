import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickAssessment = {
  id: "01a0657d-029b-7f0d-a8c7-a60fa01edd30",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "quick-assessment",
  title: "Quick Assessment",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
