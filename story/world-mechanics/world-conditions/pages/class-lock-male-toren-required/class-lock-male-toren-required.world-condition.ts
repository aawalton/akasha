import type { WorldCondition } from "akasha/story/world-mechanics/world-conditions/world-condition.page-type.types.ts"

export const classLockMaleTorenRequired = {
  id: "01a0655a-7b7a-71cf-8a7b-4414e5d3cdac",
  type: "world-condition",
  slug: "class-lock-male-toren-required",
  title: "Class Lock: Male Toren required.",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
