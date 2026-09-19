import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const analyzeObject = {
  id: "01a06575-97eb-7c77-a3ae-967dcab3cd53",
  type: "page-type/world-skill",
  slug: "analyze-object",
  title: "Analyze Object",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
