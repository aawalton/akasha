import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const threatAnalysis = {
  id: "01a0657d-0315-7d56-9bda-cb3bab4c900d",
  type: "page-type/world-skill",
  slug: "threat-analysis",
  title: "Threat Analysis",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
