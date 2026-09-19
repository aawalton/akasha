import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const martialArtist = {
  id: "01a0657e-022d-79fa-aea1-49439aff60a5",
  type: "page-type/world-class",
  slug: "martial-artist",
  title: "Martial Artist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
