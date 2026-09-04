import type { WorldCondition } from "../world-condition.page-type.ts"

export const terribleHunger = {
  id: "01a0655a-7b7b-72c1-b627-3c608ccc6bec",
  pageTypeSlug: "world-condition",
  slug: "terrible-hunger",
  title: "Terrible Hunger",
  worldSlug: "the-wandering-inn",
} as const satisfies WorldCondition
