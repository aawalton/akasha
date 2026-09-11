import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const convincingLie = {
  id: "01a06575-97fd-702e-82e2-d3ff6f4ee932",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "convincing-lie",
  title: "Convincing Lie",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
