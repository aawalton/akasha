import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const impactPunch = {
  id: "01a06575-981d-7ea8-98c4-9b7abd168e47",
  type: "world-skill",
  slug: "impact-punch",
  title: "Impact Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
