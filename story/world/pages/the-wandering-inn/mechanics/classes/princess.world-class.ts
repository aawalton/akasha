import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const princess = {
  id: "01a06586-0a16-743c-b5bb-40c8cb8fe2b5",
  type: "page-type/world-class",
  slug: "princess",
  title: "Princess",
  world: "world/the-wandering-inn",
  appearanceCount: 330,
  evolvesToSlugs: ["world-class/worldly-princess"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.358Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
