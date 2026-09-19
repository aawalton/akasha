import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bugward = {
  id: "01a06575-97f9-7221-b685-b9be683cd341",
  type: "page-type/world-skill",
  slug: "bugward",
  title: "Bugward",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
