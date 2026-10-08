import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const general = {
  id: "01a0657e-136b-721a-8442-bfd68222daf3",
  type: "page-type/world-class",
  slug: "general",
  title: "General",
  world: "world/the-wandering-inn",
  appearanceCount: 297,
  aliases: ["generals"],
  evolvesFromSlugs: ["world-class/warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.459Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
