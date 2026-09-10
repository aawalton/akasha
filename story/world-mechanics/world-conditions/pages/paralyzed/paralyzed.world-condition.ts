import type { WorldCondition } from "../../world-condition.page-type.types.ts"

export const paralyzed = {
  id: "01a0655a-7b7b-7d03-b5b2-aab9db85129a",
  pageTypeSlug: "world-condition",
  type: "world-condition",
  slug: "paralyzed",
  title: "Paralyzed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
