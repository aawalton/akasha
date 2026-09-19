import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const counterfireOpportunity = {
  id: "01a06575-97fe-7765-a509-627147b93965",
  type: "page-type/world-skill",
  slug: "counterfire-opportunity",
  title: "Counterfire Opportunity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
