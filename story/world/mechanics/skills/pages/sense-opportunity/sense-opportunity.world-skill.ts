import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseOpportunity = {
  id: "01a0657d-02be-71d3-9c86-5673527c9531",
  type: "page-type/world-skill",
  slug: "sense-opportunity",
  title: "Sense Opportunity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
