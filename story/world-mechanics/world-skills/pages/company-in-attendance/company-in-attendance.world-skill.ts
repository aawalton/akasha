import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const companyInAttendance = {
  id: "01a06575-97fc-7ec7-8b96-1c2f8e5ea969",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "company-in-attendance",
  title: "Company, In Attendance",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
