import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const paralyzed = {
  id: "01a0655a-7b7b-7d03-b5b2-aab9db85129a",
  type: "page-type/world-condition",
  slug: "paralyzed",
  title: "Paralyzed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
