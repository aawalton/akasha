import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const allWeatherWorksite = {
  id: "01a06575-97eb-72c0-b1d2-33c650a8ab5c",
  type: "page-type/world-skill",
  slug: "all-weather-worksite",
  title: "All Weather Worksite",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
