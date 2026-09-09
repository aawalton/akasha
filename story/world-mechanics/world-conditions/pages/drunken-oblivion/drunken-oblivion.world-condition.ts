import type { WorldCondition } from "../../world-condition.page-type.ts"

export const drunkenOblivion = {
  id: "01a0655a-7b7a-7455-9c62-340d9d2c0941",
  pageTypeSlug: "world-condition",
  type: "world-condition",
  slug: "drunken-oblivion",
  title: "Drunken Oblivion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCondition
