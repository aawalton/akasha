import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const wyvernRider = {
  id: "01a06586-0a85-739c-84f6-0ae793fc3b6d",
  type: "page-type/world-class",
  slug: "wyvern-rider",
  title: "Wyvern Rider",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
