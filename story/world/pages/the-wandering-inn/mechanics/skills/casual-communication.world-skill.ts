import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const casualCommunication = {
  id: "01a06575-97fa-72bf-85c2-c7504e431c6a",
  type: "page-type/world-skill",
  slug: "casual-communication",
  title: "Casual Communication",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
