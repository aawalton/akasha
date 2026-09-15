import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const swiftMustering = {
  id: "01a0657d-0303-7410-adf7-ebf664fcc4ad",
  type: "world-skill",
  slug: "swift-mustering",
  title: "Swift Mustering",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
