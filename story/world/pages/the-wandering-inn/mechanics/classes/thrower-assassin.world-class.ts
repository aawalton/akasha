import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const throwerAssassin = {
  id: "01a06586-0a67-74e4-a392-16f5309d6dd8",
  type: "page-type/world-class",
  slug: "thrower-assassin",
  title: "Thrower Assassin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
