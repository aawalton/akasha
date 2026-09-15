import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const senseTemperature = {
  id: "01a0657d-02be-7679-9582-0764e3688789",
  type: "world-skill",
  slug: "sense-temperature",
  title: "Sense Temperature",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
