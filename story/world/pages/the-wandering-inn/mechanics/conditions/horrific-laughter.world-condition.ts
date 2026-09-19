import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const horrificLaughter = {
  id: "01a0655a-7b7b-778b-9935-86351099d981",
  type: "page-type/world-condition",
  slug: "horrific-laughter",
  title: "Horrific Laughter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
