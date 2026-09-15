import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const fastTravelLocations = {
  id: "01a06575-980c-71e2-8748-c00a634ee36f",
  type: "world-skill",
  slug: "fast-travel-locations",
  title: "Fast Travel Locations",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
