import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const soccerPlayer = {
  id: "01a0657e-025a-72d7-9559-3ffb0eae0249",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "soccer-player",
  title: "Soccer Player",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
