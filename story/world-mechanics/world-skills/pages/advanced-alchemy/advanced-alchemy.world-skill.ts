import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const advancedAlchemy = {
  id: "01a06575-97e9-7771-96e7-b3ba242bddbc",
  type: "world-skill",
  slug: "advanced-alchemy",
  title: "Advanced Alchemy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
