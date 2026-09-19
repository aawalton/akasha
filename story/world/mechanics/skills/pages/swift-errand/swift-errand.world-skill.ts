import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftErrand = {
  id: "01a0657d-0303-704d-8890-048867cd1d17",
  type: "page-type/world-skill",
  slug: "swift-errand",
  title: "Swift Errand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
