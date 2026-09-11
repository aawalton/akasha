import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickTrainingFighters = {
  id: "01a0657d-029b-70ea-8db3-7f28a1f46ec4",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "quick-training-fighters",
  title: "Quick Training: Fighters",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
