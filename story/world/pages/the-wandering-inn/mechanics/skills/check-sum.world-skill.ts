import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const checkSum = {
  id: "01a06575-97fb-78b9-9e46-7086b51f5678",
  type: "page-type/world-skill",
  slug: "check-sum",
  title: "Check Sum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
