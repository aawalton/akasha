import type { WorldSkill } from "../../world-skill.page-type.ts"

export const testWater = {
  id: "01a0657d-0311-723e-9c2a-594a473c91df",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "test-water",
  title: "Test Water",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
