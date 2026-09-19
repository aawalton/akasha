import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bannerlady = {
  id: "01a0657e-01b0-7679-b240-ff65140f621b",
  type: "page-type/world-class",
  slug: "bannerlady",
  title: "Bannerlady",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["warrior"],
  references: "jsonl",
} as const satisfies WorldClass
