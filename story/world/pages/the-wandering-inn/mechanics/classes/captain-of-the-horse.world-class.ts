import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const captainOfTheHorse = {
  id: "01a0657e-01c1-7ea3-b0cb-f36a626327df",
  type: "page-type/world-class",
  slug: "captain-of-the-horse",
  title: "Captain of the Horse",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
