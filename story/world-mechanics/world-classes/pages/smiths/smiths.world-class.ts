import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const smiths = {
  id: "01a0657e-025a-74b2-b40f-3490a9ddc6fd",
  type: "world-class",
  slug: "smiths",
  title: "Smiths",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
