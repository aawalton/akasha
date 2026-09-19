import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const smith = {
  id: "01a0657e-0259-74a9-99d0-2bf33a13421f",
  type: "page-type/world-class",
  slug: "smith",
  title: "Smith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
