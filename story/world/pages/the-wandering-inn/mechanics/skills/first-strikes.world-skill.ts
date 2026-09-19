import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const firstStrikes = {
  id: "01a06575-980d-7787-9e3f-adc7b4823b8d",
  type: "page-type/world-skill",
  slug: "first-strikes",
  title: "First Strikes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
