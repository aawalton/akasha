import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const sandThrow = {
  id: "01a0657d-02b7-73c4-9161-7fd8a1d16a9a",
  type: "world-skill",
  slug: "sand-throw",
  title: "Sand Throw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
