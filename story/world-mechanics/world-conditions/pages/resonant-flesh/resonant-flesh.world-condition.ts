import type { WorldCondition } from "akasha/story/world-mechanics/world-conditions/world-condition.page-type.types.ts"

export const resonantFlesh = {
  id: "01a0655a-7b7b-7457-bc5a-fc7831925ce8",
  type: "world-condition",
  slug: "resonant-flesh",
  title: "Resonant Flesh",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
