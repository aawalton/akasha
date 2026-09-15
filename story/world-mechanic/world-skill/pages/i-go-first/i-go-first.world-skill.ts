import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const iGoFirst = {
  id: "01a06575-981b-7243-a5c3-98543f3ac5a4",
  type: "world-skill",
  slug: "i-go-first",
  title: "I Go First",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
