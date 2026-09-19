import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const diagonalSlash = {
  id: "01a06575-9803-7a61-82ca-77df97b21146",
  type: "page-type/world-skill",
  slug: "diagonal-slash",
  title: "Diagonal Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
