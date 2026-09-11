import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const advancedMetalworking = {
  id: "01a06575-97e9-7995-94d7-b1416e4e7537",
  type: "world-skill",
  slug: "advanced-metalworking",
  title: "Advanced Metalworking",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
