import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const zigzagDash = {
  id: "01a0657d-0338-7198-a410-df7479b398ed",
  type: "page-type/world-skill",
  slug: "zigzag-dash",
  title: "Zigzag Dash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
