import type { WorldCondition } from "../../world-condition.page-type.ts"

export const paralyzed = {
  id: "01a0655a-7b7b-7d03-b5b2-aab9db85129a",
  pageTypeSlug: "world-condition",
  slug: "paralyzed",
  title: "Paralyzed",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
