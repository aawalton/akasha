import type { WorldCondition } from "../../world-condition.page-type.types.ts"

export const conditionChampionOfTheBlightedLands = {
  id: "01a0655a-7b7a-76c9-a516-5af751c3f0b0",
  pageTypeSlug: "world-condition",
  type: "world-condition",
  slug: "condition-champion-of-the-blighted-lands",
  title: "Condition: Champion of the Blighted Lands",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
