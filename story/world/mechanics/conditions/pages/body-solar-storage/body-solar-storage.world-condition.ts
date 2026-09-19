import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const bodySolarStorage = {
  id: "01a0655a-7b7a-763d-b0b1-6f22f864408f",
  type: "page-type/world-condition",
  slug: "body-solar-storage",
  title: "Body: Solar Storage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
