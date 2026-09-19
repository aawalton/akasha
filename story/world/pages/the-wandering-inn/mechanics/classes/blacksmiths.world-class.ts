import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const blacksmiths = {
  id: "01a0657e-133e-7e49-b94e-340460458379",
  type: "page-type/world-class",
  slug: "blacksmiths",
  title: "Blacksmiths",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
