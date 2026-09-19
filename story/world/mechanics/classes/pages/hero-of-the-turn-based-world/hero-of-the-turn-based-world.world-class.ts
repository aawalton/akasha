import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const heroOfTheTurnBasedWorld = {
  id: "01a0657e-1373-738e-a372-6d902ad96c58",
  type: "page-type/world-class",
  slug: "hero-of-the-turn-based-world",
  title: "Hero of the Turn-Based World",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
