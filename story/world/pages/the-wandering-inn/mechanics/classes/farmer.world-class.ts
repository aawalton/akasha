import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const farmer = {
  id: "01a0657e-1363-7e2d-82d8-1d438b6c5dad",
  type: "page-type/world-class",
  slug: "farmer",
  title: "Farmer",
  world: "world/the-wandering-inn",
  appearanceCount: 164,
  evolvesToSlugs: ["world-class/farm-lady"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.451Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
