import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const queenTemporary = {
  id: "01a06586-0a1a-7787-8fee-36448ccc8bac",
  type: "page-type/world-class",
  slug: "queen-temporary",
  title: "Queen (Temporary)",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["duelist-princess"],
  references: "jsonl",
} as const satisfies WorldClass
