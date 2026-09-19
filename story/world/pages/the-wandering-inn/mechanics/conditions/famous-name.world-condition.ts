import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const famousName = {
  id: "01a0655a-7b7a-71ab-8892-172d3ec32545",
  type: "page-type/world-condition",
  slug: "famous-name",
  title: "Famous Name",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
