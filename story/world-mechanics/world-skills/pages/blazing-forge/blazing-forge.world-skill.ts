import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const blazingForge = {
  id: "01a06575-97f6-7d6e-b121-ccc6d1f71bf7",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "blazing-forge",
  title: "Blazing Forge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
