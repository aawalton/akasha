import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const restored = {
  id: "01a0655a-7b7b-70f5-aa8b-04dbd7e90844",
  type: "page-type/world-condition",
  slug: "restored",
  title: "Restored",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
