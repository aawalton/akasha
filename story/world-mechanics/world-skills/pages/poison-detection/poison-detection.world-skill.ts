import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const poisonDetection = {
  id: "01a0657d-0295-7a56-8d91-f92cecf77267",
  type: "world-skill",
  slug: "poison-detection",
  title: "Poison Detection",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
