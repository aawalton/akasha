import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swordman = {
  id: "01a06586-0a61-717b-8b1a-fd48484c419b",
  type: "page-type/world-class",
  slug: "swordman",
  title: "Swordman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
