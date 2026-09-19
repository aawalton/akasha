import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const evasiveRolls = {
  id: "01a06575-9809-750f-bf1c-df98fcb0abfc",
  type: "page-type/world-skill",
  slug: "evasive-rolls",
  title: "Evasive Rolls",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
