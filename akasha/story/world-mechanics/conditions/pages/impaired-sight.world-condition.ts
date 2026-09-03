import type { WorldCondition } from "../world-condition.page-type.ts"

export const impairedSight = {
  id: "01a0655a-7b7b-78e2-98df-8f192903995e",
  pageTypeSlug: "world-condition",
  slug: "impaired-sight",
  title: "Impaired Sight",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldCondition
