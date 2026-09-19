import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dogLord = {
  id: "01a0657e-1356-7211-9222-187f91fc0646",
  type: "page-type/world-class",
  slug: "dog-lord",
  title: "Dog Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
