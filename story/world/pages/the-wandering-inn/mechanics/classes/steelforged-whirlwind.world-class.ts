import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const steelforgedWhirlwind = {
  id: "01a06586-0a53-7ed5-abcb-834151de80e7",
  type: "page-type/world-class",
  slug: "steelforged-whirlwind",
  title: "Steelforged Whirlwind",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/steel-tempest"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.419Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
