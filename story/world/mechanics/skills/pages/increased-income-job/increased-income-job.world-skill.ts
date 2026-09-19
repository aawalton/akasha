import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const increasedIncomeJob = {
  id: "01a06575-981e-7f04-ac5f-ca91fcc7325a",
  type: "page-type/world-skill",
  slug: "increased-income-job",
  title: "Increased Income: Job",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
