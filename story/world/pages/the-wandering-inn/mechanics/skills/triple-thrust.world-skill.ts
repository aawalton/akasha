import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tripleThrust = {
  id: "01a0657d-0317-7d90-ab9c-a3bc0e4bee5d",
  type: "page-type/world-skill",
  slug: "triple-thrust",
  title: "Triple Thrust",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
