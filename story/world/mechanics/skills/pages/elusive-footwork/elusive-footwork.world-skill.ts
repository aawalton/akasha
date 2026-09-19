import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elusiveFootwork = {
  id: "01a06575-9807-7f51-9c07-f7d687e46734",
  type: "page-type/world-skill",
  slug: "elusive-footwork",
  title: "Elusive Footwork",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
