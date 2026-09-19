import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const championOfTheFoos = {
  id: "01a0657e-01c3-72ef-af35-ca02ec24b1f6",
  type: "page-type/world-class",
  slug: "champion-of-the-foos",
  title: "Champion of the Foos",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
