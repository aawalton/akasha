import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const testWater = {
  id: "01a0657d-0311-723e-9c2a-594a473c91df",
  type: "page-type/world-skill",
  slug: "test-water",
  title: "Test Water",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.737Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
