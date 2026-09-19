import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const drunkenOblivion = {
  id: "01a0655a-7b7a-7455-9c62-340d9d2c0941",
  type: "page-type/world-condition",
  slug: "drunken-oblivion",
  title: "Drunken Oblivion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
