import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scythingArms = {
  id: "01a0657d-02b8-742d-8e3f-55f598ee40ef",
  type: "page-type/world-skill",
  slug: "scything-arms",
  title: "Scything Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
