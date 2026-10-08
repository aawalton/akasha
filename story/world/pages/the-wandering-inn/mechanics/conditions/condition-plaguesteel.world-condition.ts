import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const conditionPlaguesteel = {
  id: "01a0655a-7b7a-76a4-92de-b8b37306101a",
  type: "page-type/world-condition",
  slug: "condition-plaguesteel",
  title: "Condition – Plaguesteel",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
