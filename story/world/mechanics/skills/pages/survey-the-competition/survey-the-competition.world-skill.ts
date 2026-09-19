import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const surveyTheCompetition = {
  id: "01a0657d-0303-7c92-8dbf-870b07f4db3a",
  type: "page-type/world-skill",
  slug: "survey-the-competition",
  title: "Survey the Competition",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
