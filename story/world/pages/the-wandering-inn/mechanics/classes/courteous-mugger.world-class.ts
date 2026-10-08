import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courteousMugger = {
  id: "01a0657e-01cb-7d64-b467-5a12f9cb582e",
  type: "page-type/world-class",
  slug: "courteous-mugger",
  title: "Courteous Mugger",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/courteous-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.947Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
