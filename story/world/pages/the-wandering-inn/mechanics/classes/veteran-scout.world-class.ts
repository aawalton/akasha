import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranScout = {
  id: "01a06586-0a6f-7e80-b32b-4c26c03aa8f2",
  type: "page-type/world-class",
  slug: "veteran-scout",
  title: "Veteran Scout",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  evolvesToSlugs: ["world-class/bowman-of-loss"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.447Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
