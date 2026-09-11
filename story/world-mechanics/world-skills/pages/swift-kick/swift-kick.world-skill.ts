import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const swiftKick = {
  id: "01a0657d-0303-72a9-a7e2-48021842b358",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "swift-kick",
  title: "Swift Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
