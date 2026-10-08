import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const conditionChampionOfTheBlightedLands = {
  id: "01a0655a-7b7a-76c9-a516-5af751c3f0b0",
  type: "page-type/world-condition",
  slug: "condition-champion-of-the-blighted-lands",
  title: "Condition: Champion of the Blighted Lands",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
