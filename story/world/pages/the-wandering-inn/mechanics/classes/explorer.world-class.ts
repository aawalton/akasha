import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const explorer = {
  id: "01a0657e-1361-7ea6-804c-d4d123936091",
  type: "page-type/world-class",
  slug: "explorer",
  title: "Explorer",
  world: "world/the-wandering-inn",
  appearanceCount: 20,
  aliases: ["explorers"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.449Z",
  updatedAt: "2026-09-22T13:28:56.000Z",
} as const satisfies WorldClass
