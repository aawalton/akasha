import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artist = {
  id: "01a0657e-1331-7732-b67e-e2b9bae295e3",
  type: "page-type/world-class",
  slug: "artist",
  title: "Artist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
