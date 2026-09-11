import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bookie = {
  id: "01a0657e-133f-70f1-93e9-97c3bcf2073f",
  type: "world-class",
  slug: "bookie",
  title: "Bookie",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
