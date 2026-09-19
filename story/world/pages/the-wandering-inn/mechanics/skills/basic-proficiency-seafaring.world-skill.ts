import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicProficiencySeafaring = {
  id: "01a06575-97f4-7249-83b6-c440714774d2",
  type: "page-type/world-skill",
  slug: "basic-proficiency-seafaring",
  title: "Basic Proficiency: Seafaring",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
