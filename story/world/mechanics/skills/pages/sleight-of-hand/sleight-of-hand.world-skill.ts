import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sleightOfHand = {
  id: "01a0657d-02c6-7931-a5f5-97cb829fa49b",
  type: "page-type/world-skill",
  slug: "sleight-of-hand",
  title: "Sleight of Hand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
