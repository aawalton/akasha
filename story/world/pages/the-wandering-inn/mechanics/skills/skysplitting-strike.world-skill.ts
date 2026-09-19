import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const skysplittingStrike = {
  id: "01a0657d-02c6-7392-83e0-82a5aec2f396",
  type: "page-type/world-skill",
  slug: "skysplitting-strike",
  title: "Skysplitting Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
