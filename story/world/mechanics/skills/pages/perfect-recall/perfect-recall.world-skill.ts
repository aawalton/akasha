import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectRecall = {
  id: "01a0657d-028f-7d12-ac6f-8a5440c3e6b0",
  type: "page-type/world-skill",
  slug: "perfect-recall",
  title: "Perfect Recall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
