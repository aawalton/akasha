import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const conditionMiracle = {
  id: "01a0655a-7b7a-7438-8fda-9f51abcccde1",
  type: "page-type/world-condition",
  slug: "condition-miracle",
  title: "Condition: Miracle.",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
