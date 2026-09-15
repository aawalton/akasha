import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const checkerboardPattern = {
  id: "01a06575-97fb-74ba-9888-6853a4c07387",
  type: "world-skill",
  slug: "checkerboard-pattern",
  title: "Checkerboard Pattern",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
