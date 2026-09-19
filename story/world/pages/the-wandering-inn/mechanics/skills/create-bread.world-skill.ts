import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const createBread = {
  id: "01a06575-97fe-7c21-ae5e-57f9fd9ce118",
  type: "page-type/world-skill",
  slug: "create-bread",
  title: "Create Bread",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
