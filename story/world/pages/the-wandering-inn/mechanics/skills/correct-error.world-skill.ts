import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const correctError = {
  id: "01a06575-97fe-70ff-886f-d4c3aa326ff4",
  type: "page-type/world-skill",
  slug: "correct-error",
  title: "Correct Error",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
