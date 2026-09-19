import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const attackMeFirst = {
  id: "01a06575-97ee-7adb-b050-a82b4ada59c6",
  type: "page-type/world-skill",
  slug: "attack-me-first",
  title: "Attack Me First",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
