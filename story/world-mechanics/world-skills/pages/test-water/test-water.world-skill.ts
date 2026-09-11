import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const testWater = {
  id: "01a0657d-0311-723e-9c2a-594a473c91df",
  type: "world-skill",
  slug: "test-water",
  title: "Test Water",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
