import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const proficiencyAerodynamics = {
  id: "01a0657d-0297-7bba-b93a-3bfc1c0f62dc",
  type: "page-type/world-skill",
  slug: "proficiency-aerodynamics",
  title: "Proficiency: Aerodynamics",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
