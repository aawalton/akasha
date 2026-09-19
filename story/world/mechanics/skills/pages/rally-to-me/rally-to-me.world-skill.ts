import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rallyToMe = {
  id: "01a0657d-029c-7b90-b986-30c01cec883f",
  type: "page-type/world-skill",
  slug: "rally-to-me",
  title: "Rally To Me",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
