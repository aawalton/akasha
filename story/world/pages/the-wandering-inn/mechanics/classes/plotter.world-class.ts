import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const plotter = {
  id: "01a06586-0a0a-7277-a41c-38298471a7ec",
  type: "page-type/world-class",
  slug: "plotter",
  title: "Plotter",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesToSlugs: ["world-class/chaos-schemer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.346Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
