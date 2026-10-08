import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quickMovement = {
  id: "01a0657d-029b-76e1-84e2-954ca4557c0f",
  type: "page-type/world-skill",
  slug: "quick-movement",
  title: "Quick Movement",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.619Z",
  updatedAt: "2026-09-22T13:33:00.000Z",
} as const satisfies WorldSkill
