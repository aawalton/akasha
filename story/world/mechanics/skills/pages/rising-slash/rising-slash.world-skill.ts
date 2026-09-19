import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const risingSlash = {
  id: "01a0657d-02b2-7eae-abb5-9a1ced2235c0",
  type: "page-type/world-skill",
  slug: "rising-slash",
  title: "Rising Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
