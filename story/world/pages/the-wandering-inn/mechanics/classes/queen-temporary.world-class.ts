import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const queenTemporary = {
  id: "01a06586-0a1a-7787-8fee-36448ccc8bac",
  type: "page-type/world-class",
  slug: "queen-temporary",
  title: "Queen (Temporary)",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/duelist-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.362Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
