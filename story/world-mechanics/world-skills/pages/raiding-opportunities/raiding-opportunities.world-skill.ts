import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const raidingOpportunities = {
  id: "01a0657d-029c-70fd-939c-f3587b3ce910",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "raiding-opportunities",
  title: "Raiding Opportunities",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
