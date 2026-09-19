import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodiesOfIron = {
  id: "01a06575-97f6-71f8-8363-42f900e4a79e",
  type: "page-type/world-skill",
  slug: "bodies-of-iron",
  title: "Bodies of Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
