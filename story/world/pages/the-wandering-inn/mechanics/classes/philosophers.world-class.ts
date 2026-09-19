import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const philosophers = {
  id: "01a0657e-0237-745d-9671-ab055796da9d",
  type: "page-type/world-class",
  slug: "philosophers",
  title: "Philosophers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
