import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const instantRetributionThreat = {
  id: "01a06575-981f-7895-ab8d-30d865c1eec2",
  type: "page-type/world-skill",
  slug: "instant-retribution-threat",
  title: "Instant Retribution: Threat",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
