import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftInterception = {
  id: "01a0657d-0303-7033-a3be-9de2723cc3f0",
  type: "page-type/world-skill",
  slug: "swift-interception",
  title: "Swift Interception",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
