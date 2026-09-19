import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const scatterGallop = {
  id: "01a0657d-02b8-74a0-9999-6b410636f581",
  type: "page-type/world-skill",
  slug: "scatter-gallop",
  title: "Scatter Gallop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
