import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const goldenInvestment = {
  id: "01a06575-9815-71c6-9f8c-601a2d1243cd",
  type: "world-skill",
  slug: "golden-investment",
  title: "Golden Investment",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
