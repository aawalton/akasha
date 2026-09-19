import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const slowSpoilage = {
  id: "01a0657d-02c7-7a6e-8176-dc6a7326cd83",
  type: "page-type/world-skill",
  slug: "slow-spoilage",
  title: "Slow Spoilage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
