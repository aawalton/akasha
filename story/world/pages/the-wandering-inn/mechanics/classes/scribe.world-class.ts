import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const scribe = {
  id: "01a06586-0a2d-7827-a3ae-658af580bbb0",
  type: "page-type/world-class",
  slug: "scribe",
  title: "Scribe",
  world: "world/the-wandering-inn",
  appearanceCount: 80,
  aliases: ["scribes"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.381Z",
  updatedAt: "2026-09-22T13:29:59.000Z",
} as const satisfies WorldClass
