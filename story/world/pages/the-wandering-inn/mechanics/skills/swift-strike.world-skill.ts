import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swiftStrike = {
  id: "01a0657d-0306-7d69-ad81-31415dccaa64",
  type: "page-type/world-skill",
  slug: "swift-strike",
  title: "Swift Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:18:06.726Z",
  updatedAt: "2026-09-22T13:33:34.000Z",
} as const satisfies WorldSkill
