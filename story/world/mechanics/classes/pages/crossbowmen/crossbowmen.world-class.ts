import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crossbowmen = {
  id: "01a0657e-1350-7657-89a7-202be1c3d1db",
  type: "page-type/world-class",
  slug: "crossbowmen",
  title: "Crossbowmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
