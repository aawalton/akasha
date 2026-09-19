import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const assessPublicOpinions = {
  id: "01a06575-97ee-79ee-895c-24857f5ec3a8",
  type: "page-type/world-skill",
  slug: "assess-public-opinions",
  title: "Assess Public Opinions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
