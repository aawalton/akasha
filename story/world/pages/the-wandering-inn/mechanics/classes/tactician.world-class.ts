import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tactician = {
  id: "01a06586-0a63-75fa-a6d2-dda474db1dd8",
  type: "page-type/world-class",
  slug: "tactician",
  title: "Tactician",
  world: "world/the-wandering-inn",
  appearanceCount: 130,
  aliases: ["tacticians"],
  evolvesToSlugs: ["world-class/strategist-of-sympathy"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.435Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
