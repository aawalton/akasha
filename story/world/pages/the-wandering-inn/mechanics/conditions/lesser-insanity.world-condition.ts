import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const lesserInsanity = {
  id: "01a0655a-7b7b-7bb9-bdd9-395224c71824",
  type: "page-type/world-condition",
  slug: "lesser-insanity",
  title: "Lesser Insanity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
