import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inMyArms = {
  id: "01a06575-981e-7162-b0c2-781249adf0a3",
  type: "page-type/world-skill",
  slug: "in-my-arms",
  title: "In My Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
