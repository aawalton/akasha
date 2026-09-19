import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const hedonist = {
  id: "01a0657e-1372-7a8e-a512-e8ce498c01f5",
  type: "page-type/world-class",
  slug: "hedonist",
  title: "Hedonist",
  world: "world/the-wandering-inn",
  aliases: ["hedonists"],
  references: "jsonl",
} as const satisfies WorldClass
