import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const factCheck = {
  id: "01a06575-980b-76b3-94f9-513fbfd94831",
  type: "page-type/world-skill",
  slug: "fact-check",
  title: "Fact Check",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
