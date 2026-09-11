import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const swiftStrike = {
  id: "01a0657d-0306-7d69-ad81-31415dccaa64",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "swift-strike",
  title: "Swift Strike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
