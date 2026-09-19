import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emperors = {
  id: "01a0657e-01d6-757b-b9b8-522673990d8a",
  type: "page-type/world-class",
  slug: "emperors",
  title: "Emperors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
