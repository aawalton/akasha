import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectImproperLearning = {
  id: "01a06575-9803-7ea5-bb80-ad5441b6bb17",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "detect-improper-learning",
  title: "Detect Improper Learning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
