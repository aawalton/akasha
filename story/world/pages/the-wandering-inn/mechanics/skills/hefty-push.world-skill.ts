import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heftyPush = {
  id: "01a06575-9819-73f6-b87b-132b1d84d230",
  type: "page-type/world-skill",
  slug: "hefty-push",
  title: "Hefty Push",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
