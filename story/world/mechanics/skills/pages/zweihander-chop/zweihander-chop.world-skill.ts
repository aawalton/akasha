import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const zweihanderChop = {
  id: "01a0657d-0338-7a15-9211-d01be8bca51a",
  type: "page-type/world-skill",
  slug: "zweihander-chop",
  title: "Zweihander Chop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
