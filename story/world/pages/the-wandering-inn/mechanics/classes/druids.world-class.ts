import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const druids = {
  id: "01a0657e-01d5-7917-9685-b558a5b9d91c",
  type: "page-type/world-class",
  slug: "druids",
  title: "Druids",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
