import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wingCommander = {
  id: "01a06586-0a76-723d-8dd3-850e5708fc33",
  type: "page-type/world-class",
  slug: "wing-commander",
  title: "Wing Commander",
  world: "world/the-wandering-inn",
  aliases: ["wing-commanders"],
  references: "jsonl",
} as const satisfies WorldClass
