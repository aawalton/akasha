import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const relickeeperHeiress = {
  id: "01a0657e-0245-774d-886d-cf1b60ece5fa",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "relickeeper-heiress",
  title: "Relickeeper Heiress",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["heiress"],
  references: "jsonl",
} as const satisfies WorldClass
