import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const freeCut = {
  id: "01a06575-9810-7785-a6d5-b166dd63c003",
  type: "world-skill",
  slug: "free-cut",
  title: "Free Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
