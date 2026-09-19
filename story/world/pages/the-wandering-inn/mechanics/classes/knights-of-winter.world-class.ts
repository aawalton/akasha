import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightsOfWinter = {
  id: "01a0657e-0218-71fa-9296-58bfd4b4b767",
  type: "page-type/world-class",
  slug: "knights-of-winter",
  title: "Knights of Winter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
