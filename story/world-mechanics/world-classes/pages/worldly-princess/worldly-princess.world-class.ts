import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const worldlyPrincess = {
  id: "01a06586-0a84-757d-9e70-828668772da1",
  type: "world-class",
  slug: "worldly-princess",
  title: "Worldly Princess",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["princess"],
  references: "jsonl",
} as const satisfies WorldClass
