import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const classLockMaleTorenRequired = {
  id: "01a0655a-7b7a-71cf-8a7b-4414e5d3cdac",
  type: "page-type/world-condition",
  slug: "class-lock-male-toren-required",
  title: "Class Lock: Male Toren required.",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.802Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
