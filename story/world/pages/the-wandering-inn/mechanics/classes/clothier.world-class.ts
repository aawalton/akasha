import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const clothier = {
  id: "01a0657e-134b-7793-923f-edd0d592c0bb",
  type: "page-type/world-class",
  slug: "clothier",
  title: "Clothier",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
