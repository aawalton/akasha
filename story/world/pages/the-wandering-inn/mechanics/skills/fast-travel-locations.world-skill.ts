import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTravelLocations = {
  id: "01a06575-980c-71e2-8748-c00a634ee36f",
  type: "page-type/world-skill",
  slug: "fast-travel-locations",
  title: "Fast Travel Locations",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.588Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
