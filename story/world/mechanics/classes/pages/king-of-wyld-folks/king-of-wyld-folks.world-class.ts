import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingOfWyldFolks = {
  id: "01a0657e-1378-7ee0-8820-feb00aa67dca",
  type: "page-type/world-class",
  slug: "king-of-wyld-folks",
  title: "King of Wyld Folks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
