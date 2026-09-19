import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const tinkerer = {
  id: "01a0657e-026c-74b4-9085-7b3b25d5a16a",
  type: "page-type/world-class",
  slug: "tinkerer",
  title: "Tinkerer",
  world: "world/the-wandering-inn",
  aliases: ["tinkerers"],
  references: "jsonl",
} as const satisfies WorldClass
