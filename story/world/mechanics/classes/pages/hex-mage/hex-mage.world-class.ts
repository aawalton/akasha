import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hexMage = {
  id: "01a0657e-01f8-7c1d-adb5-f928de528d17",
  type: "page-type/world-class",
  slug: "hex-mage",
  title: "Hex Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
