import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const impairedSight = {
  id: "01a0655a-7b7b-78e2-98df-8f192903995e",
  type: "page-type/world-condition",
  slug: "impaired-sight",
  title: "Impaired Sight",
  world: "world/the-wandering-inn",
  createdAt: "2026-09-03T03:40:23.803Z",
  updatedAt: "2026-09-19T16:15:37.000Z",
} as const satisfies WorldCondition
