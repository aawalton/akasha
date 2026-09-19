import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const employeesSpeciesPerks = {
  id: "01a06575-9808-7393-a5f7-4f01766bf849",
  type: "page-type/world-skill",
  slug: "employees-species-perks",
  title: "Employees: Species Perks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
