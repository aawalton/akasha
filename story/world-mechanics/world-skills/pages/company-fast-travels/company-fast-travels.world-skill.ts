import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const companyFastTravels = {
  id: "01a06575-97fc-7e81-9164-8012e26a1d50",
  type: "world-skill",
  slug: "company-fast-travels",
  title: "Company: Fast Travels",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
