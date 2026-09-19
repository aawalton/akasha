import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const apistaAgileFlier = {
  id: "01a06575-97eb-7d5a-b820-bcb73368c4c9",
  type: "page-type/world-skill",
  slug: "apista-agile-flier",
  title: "Apista: Agile Flier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
