import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const dancer = {
  id: "01a0657e-1351-7a29-bf2b-049196fd067c",
  type: "page-type/world-class",
  slug: "dancer",
  title: "Dancer",
  world: "world/the-wandering-inn",
  appearanceCount: 32,
  aliases: ["dancers"],
  evolvesToSlugs: ["world-class/dancer-of-advent"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.433Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
