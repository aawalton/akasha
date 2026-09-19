import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const wordlessThing = {
  id: "01a0655a-7b7b-782a-a0a0-4c34419adae7",
  type: "page-type/world-condition",
  slug: "wordless-thing",
  title: "Wordless Thing",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
