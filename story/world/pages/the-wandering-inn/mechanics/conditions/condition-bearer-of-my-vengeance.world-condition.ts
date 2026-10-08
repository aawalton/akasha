import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const conditionBearerOfMyVengeance = {
  id: "01a0655a-7b7a-70f1-822c-684938c6b6af",
  type: "page-type/world-condition",
  slug: "condition-bearer-of-my-vengeance",
  title: "Condition: Bearer of My Vengeance",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
