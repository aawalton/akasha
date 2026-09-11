import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const witcher = {
  id: "01a0657e-0272-7929-9df6-0c4b512ab57f",
  type: "world-class",
  slug: "witcher",
  title: "Witcher",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
