import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const proficiencyMartialArts = {
  id: "01a0657d-0297-7297-9482-bd2ec077fb4d",
  type: "world-skill",
  slug: "proficiency-martial-arts",
  title: "Proficiency: Martial Arts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
