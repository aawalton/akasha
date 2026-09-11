import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fullWeightCounter = {
  id: "01a06575-9811-7a78-8f64-a784f255f340",
  type: "world-skill",
  slug: "full-weight-counter",
  title: "Full-Weight Counter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
