import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const combinedArms = {
  id: "01a06575-97fc-76b8-b690-7f2c9faddff0",
  type: "page-type/world-skill",
  slug: "combined-arms",
  title: "Combined Arms",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.572Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
