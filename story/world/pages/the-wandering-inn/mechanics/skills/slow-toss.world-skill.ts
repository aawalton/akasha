import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slowToss = {
  id: "01a0657d-02c7-76e4-ab45-172a58c63cd7",
  type: "page-type/world-skill",
  slug: "slow-toss",
  title: "Slow Toss",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
