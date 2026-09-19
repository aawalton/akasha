import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rollspring = {
  id: "01a0657d-02b6-71cb-8c1a-248755790b7b",
  type: "page-type/world-skill",
  slug: "rollspring",
  title: "Rollspring",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
