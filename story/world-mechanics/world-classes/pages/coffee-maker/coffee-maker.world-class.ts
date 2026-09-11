import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const coffeeMaker = {
  id: "01a0657e-134c-7341-9fbc-c11d1e1b494e",
  type: "world-class",
  slug: "coffee-maker",
  title: "Coffee Maker",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
