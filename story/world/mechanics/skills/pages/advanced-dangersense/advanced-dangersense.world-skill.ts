import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const advancedDangersense = {
  id: "01a06575-97e9-79af-b25b-7f4569800fca",
  type: "page-type/world-skill",
  slug: "advanced-dangersense",
  title: "Advanced Dangersense",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
