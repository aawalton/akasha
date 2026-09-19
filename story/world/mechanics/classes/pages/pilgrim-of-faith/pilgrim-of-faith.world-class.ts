import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pilgrimOfFaith = {
  id: "01a0657e-0237-734b-9008-0c654d930844",
  type: "page-type/world-class",
  slug: "pilgrim-of-faith",
  title: "Pilgrim of Faith",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
