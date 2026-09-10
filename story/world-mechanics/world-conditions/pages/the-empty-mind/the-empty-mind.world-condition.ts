import type { WorldCondition } from "../../world-condition.page-type.types.ts"

export const theEmptyMind = {
  id: "01a0655a-7b7b-7310-938c-6ecd866de82c",
  pageTypeSlug: "world-condition",
  type: "world-condition",
  slug: "the-empty-mind",
  title: "The Empty Mind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
