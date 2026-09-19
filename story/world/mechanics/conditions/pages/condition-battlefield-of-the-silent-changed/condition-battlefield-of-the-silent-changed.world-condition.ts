import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const conditionBattlefieldOfTheSilentChanged = {
  id: "01a0655a-7b7a-781c-98b6-29e218e07f99",
  type: "page-type/world-condition",
  slug: "condition-battlefield-of-the-silent-changed",
  title: "Condition – Battlefield of the Silent Changed.",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
