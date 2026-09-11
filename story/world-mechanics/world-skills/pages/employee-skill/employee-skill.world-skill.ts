import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const employeeSkill = {
  id: "01a06575-9807-7e92-aaa3-e2b543d9d731",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "employee-skill",
  title: "Employee Skill",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
