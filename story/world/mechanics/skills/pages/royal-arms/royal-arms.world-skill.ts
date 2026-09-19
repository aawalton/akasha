import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const royalArms = {
  id: "01a0657d-02b6-742c-b6a9-a5906b112a5c",
  type: "page-type/world-skill",
  slug: "royal-arms",
  title: "Royal Arms",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
