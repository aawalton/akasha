import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const officerUnderArms = {
  id: "01a0657d-027c-783d-859b-6e65dd673889",
  type: "page-type/world-skill",
  slug: "officer-under-arms",
  title: "Officer Under Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
