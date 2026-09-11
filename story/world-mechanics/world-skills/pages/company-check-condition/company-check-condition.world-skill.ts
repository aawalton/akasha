import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const companyCheckCondition = {
  id: "01a06575-97fc-744a-967d-da2419adace6",
  type: "world-skill",
  slug: "company-check-condition",
  title: "Company: Check Condition",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
