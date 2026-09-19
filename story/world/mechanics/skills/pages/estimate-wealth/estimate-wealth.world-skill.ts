import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const estimateWealth = {
  id: "01a06575-9809-72fe-89ed-6733ce1ca76f",
  type: "page-type/world-skill",
  slug: "estimate-wealth",
  title: "Estimate Wealth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
