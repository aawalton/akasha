import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const digitalArtist = {
  id: "01a0657e-01cf-7d4f-8a3f-7941f7e97c7b",
  type: "page-type/world-class",
  slug: "digital-artist",
  title: "Digital Artist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
