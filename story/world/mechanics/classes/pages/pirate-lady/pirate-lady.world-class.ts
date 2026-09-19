import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pirateLady = {
  id: "01a0657e-0237-7670-a404-d8a924d37df5",
  type: "page-type/world-class",
  slug: "pirate-lady",
  title: "Pirate Lady",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
