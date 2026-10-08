import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const foragerCook = {
  id: "01a0657e-01de-76de-8c90-74b164e3604a",
  type: "page-type/world-class",
  slug: "forager-cook",
  title: "Forager Cook",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/cook"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.966Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
