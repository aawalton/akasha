import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const avertDisaster = {
  id: "01a06575-97f2-7c0a-ab8b-fe2f802c3a9b",
  type: "page-type/world-skill",
  slug: "avert-disaster",
  title: "Avert Disaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
