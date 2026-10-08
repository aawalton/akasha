import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wingCommander = {
  id: "01a06586-0a76-723d-8dd3-850e5708fc33",
  type: "page-type/world-class",
  slug: "wing-commander",
  title: "Wing Commander",
  world: "world/the-wandering-inn",
  appearanceCount: 15,
  aliases: ["wing-commanders"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.454Z",
  updatedAt: "2026-09-22T13:30:28.000Z",
} as const satisfies WorldClass
