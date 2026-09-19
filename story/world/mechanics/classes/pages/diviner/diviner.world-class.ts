import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const diviner = {
  id: "01a0657e-1354-7065-aae0-0fa7f40690ac",
  type: "page-type/world-class",
  slug: "diviner",
  title: "Diviner",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
