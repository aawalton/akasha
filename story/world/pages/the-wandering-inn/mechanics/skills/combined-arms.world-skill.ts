import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const combinedArms = {
  id: "01a06575-97fc-76b8-b690-7f2c9faddff0",
  type: "page-type/world-skill",
  slug: "combined-arms",
  title: "Combined Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
