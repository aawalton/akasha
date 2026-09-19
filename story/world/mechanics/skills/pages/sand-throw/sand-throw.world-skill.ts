import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sandThrow = {
  id: "01a0657d-02b7-73c4-9161-7fd8a1d16a9a",
  type: "page-type/world-skill",
  slug: "sand-throw",
  title: "Sand Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
