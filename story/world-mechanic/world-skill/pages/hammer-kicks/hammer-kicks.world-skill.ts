import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const hammerKicks = {
  id: "01a06575-9818-7105-9349-6045675ca19c",
  type: "world-skill",
  slug: "hammer-kicks",
  title: "Hammer Kicks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
