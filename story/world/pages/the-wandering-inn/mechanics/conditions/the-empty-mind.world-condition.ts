import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const theEmptyMind = {
  id: "01a0655a-7b7b-7310-938c-6ecd866de82c",
  type: "page-type/world-condition",
  slug: "the-empty-mind",
  title: "The Empty Mind",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T03:40:23.803Z",
  updatedAt: "2026-09-22T13:30:29.000Z",
} as const satisfies WorldCondition
