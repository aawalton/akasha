import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const employeeSkill = {
  id: "01a06575-9807-7e92-aaa3-e2b543d9d731",
  type: "page-type/world-skill",
  slug: "employee-skill",
  title: "Employee Skill",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
