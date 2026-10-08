import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const leader = {
  id: "01a0657e-138d-71d5-a5c5-c98581a1269a",
  type: "page-type/world-class",
  slug: "leader",
  title: "Leader",
  world: "world/the-wandering-inn",
  appearanceCount: 25,
  aliases: ["leaders"],
  evolvesToSlugs: ["world-class/chieftain"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.493Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
