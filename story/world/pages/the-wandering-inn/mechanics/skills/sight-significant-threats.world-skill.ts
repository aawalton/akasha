import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sightSignificantThreats = {
  id: "01a0657d-02c1-7c6b-9952-6910754e51d4",
  type: "page-type/world-skill",
  slug: "sight-significant-threats",
  title: "Sight: Significant Threats",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
