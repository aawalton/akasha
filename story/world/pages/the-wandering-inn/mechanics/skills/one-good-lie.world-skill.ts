import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const oneGoodLie = {
  id: "01a0657d-027c-7e34-8fae-67c85a66d3df",
  type: "page-type/world-skill",
  slug: "one-good-lie",
  title: "One Good Lie",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
