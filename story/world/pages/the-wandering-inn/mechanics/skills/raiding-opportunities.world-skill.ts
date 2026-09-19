import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const raidingOpportunities = {
  id: "01a0657d-029c-70fd-939c-f3587b3ce910",
  type: "page-type/world-skill",
  slug: "raiding-opportunities",
  title: "Raiding Opportunities",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
