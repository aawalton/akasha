import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slowMetabolism = {
  id: "01a0657d-02c6-78e5-9757-da0a620db5f3",
  type: "page-type/world-skill",
  slug: "slow-metabolism",
  title: "Slow Metabolism",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
