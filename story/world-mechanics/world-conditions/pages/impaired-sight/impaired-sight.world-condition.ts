import type { WorldCondition } from "../../world-condition.page-type.types.ts"

export const impairedSight = {
  id: "01a0655a-7b7b-78e2-98df-8f192903995e",
  pageTypeSlug: "world-condition",
  type: "world-condition",
  slug: "impaired-sight",
  title: "Impaired Sight",
  world: "the-wandering-inn",
} as const satisfies WorldCondition
