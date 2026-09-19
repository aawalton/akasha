import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickAppraisal = {
  id: "01a0657d-029b-714e-8fb3-ba65cf17fcb9",
  type: "page-type/world-skill",
  slug: "quick-appraisal",
  title: "Quick Appraisal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
