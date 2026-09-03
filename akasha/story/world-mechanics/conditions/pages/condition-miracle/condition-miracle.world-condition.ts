import type { WorldCondition } from "../../world-condition.page-type.ts"

export const conditionMiracle = {
  id: "01a0655a-7b7a-7438-8fda-9f51abcccde1",
  pageTypeSlug: "world-condition",
  slug: "condition-miracle",
  title: "Condition: Miracle.",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
