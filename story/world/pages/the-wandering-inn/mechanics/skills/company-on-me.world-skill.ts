import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const companyOnMe = {
  id: "01a06575-97fc-7b3a-8748-de8a485e2767",
  type: "page-type/world-skill",
  slug: "company-on-me",
  title: "Company, On Me",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.572Z",
  updatedAt: "2026-09-22T13:31:56.000Z",
} as const satisfies WorldSkill
