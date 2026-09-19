import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingArms = {
  id: "01a0657d-0294-70b1-b424-df19a5d32077",
  type: "page-type/world-skill",
  slug: "piercing-arms",
  title: "Piercing Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
