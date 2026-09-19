import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageArtist = {
  id: "01a0657e-0221-7984-be7c-f1eb8c015987",
  type: "page-type/world-class",
  slug: "mage-artist",
  title: "Mage Artist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
