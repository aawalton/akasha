import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const plaguesteel = {
  id: "01a0655a-7b7b-70a5-883e-db5d21301a16",
  type: "page-type/world-condition",
  slug: "plaguesteel",
  title: "Plaguesteel",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
