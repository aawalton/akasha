import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crossbowman = {
  id: "01a0657e-01cc-748c-ba62-fbaf21b6077c",
  type: "page-type/world-class",
  slug: "crossbowman",
  title: "Crossbowman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
