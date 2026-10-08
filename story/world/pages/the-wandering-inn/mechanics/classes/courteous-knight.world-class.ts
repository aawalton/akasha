import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courteousKnight = {
  id: "01a0657e-134f-7dc4-aa0e-8c64dc5f413d",
  type: "page-type/world-class",
  slug: "courteous-knight",
  title: "Courteous Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/courteous-mugger"],
  evolvesToSlugs: ["world-class/knight-of-honor-s-ember"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.431Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
