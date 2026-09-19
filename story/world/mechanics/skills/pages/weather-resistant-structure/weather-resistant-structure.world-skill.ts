import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weatherResistantStructure = {
  id: "01a0657d-032d-70cc-b613-ebbebdc4df38",
  type: "page-type/world-skill",
  slug: "weather-resistant-structure",
  title: "Weather-resistant Structure",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
