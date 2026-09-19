import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const wordsOfDisgrace = {
  id: "01a0655a-7b7b-77c9-af25-098b54cc8f33",
  type: "page-type/world-condition",
  slug: "words-of-disgrace",
  title: "Words of Disgrace",
  world: "world/the-wandering-inn",
} as const satisfies WorldCondition
