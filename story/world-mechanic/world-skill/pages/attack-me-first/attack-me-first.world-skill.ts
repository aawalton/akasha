import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const attackMeFirst = {
  id: "01a06575-97ee-7adb-b050-a82b4ada59c6",
  type: "world-skill",
  slug: "attack-me-first",
  title: "Attack Me First",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
