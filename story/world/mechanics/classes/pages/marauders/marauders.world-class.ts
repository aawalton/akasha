import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const marauders = {
  id: "01a0657e-139d-7625-8b54-54470ad56949",
  type: "page-type/world-class",
  slug: "marauders",
  title: "Marauders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
