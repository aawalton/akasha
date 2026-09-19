import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bugfriend = {
  id: "01a06575-97f9-72c9-8b66-071a451e6aa5",
  type: "page-type/world-skill",
  slug: "bugfriend",
  title: "Bugfriend",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
