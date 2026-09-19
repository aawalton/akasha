import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warlock = {
  id: "01a0657e-0270-7bc9-a8ee-6d63df604417",
  type: "page-type/world-class",
  slug: "warlock",
  title: "Warlock",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
