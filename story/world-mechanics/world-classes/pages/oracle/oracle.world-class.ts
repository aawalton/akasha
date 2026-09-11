import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const oracle = {
  id: "01a0657e-0235-79a0-982b-bd353a383c6a",
  type: "world-class",
  slug: "oracle",
  title: "Oracle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
