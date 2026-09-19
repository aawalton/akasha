import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const griffinPrince = {
  id: "01a0657e-01e5-7134-bbaf-e499f9fb5cfd",
  type: "page-type/world-class",
  slug: "griffin-prince",
  title: "Griffin Prince",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
