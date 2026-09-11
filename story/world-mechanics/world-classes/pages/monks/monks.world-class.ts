import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const monks = {
  id: "01a0657e-0233-7e0c-81a8-1b22cb4b5d9b",
  type: "world-class",
  slug: "monks",
  title: "Monks",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
