import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const houseKeeper = {
  id: "01a0657e-1375-702c-975b-2f1f13a3a9a7",
  type: "page-type/world-class",
  slug: "house-keeper",
  title: "House Keeper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
