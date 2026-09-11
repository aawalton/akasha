import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const scatterGallop = {
  id: "01a0657d-02b8-74a0-9999-6b410636f581",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "scatter-gallop",
  title: "Scatter Gallop",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
