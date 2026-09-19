import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const destroyerKnight = {
  id: "01a0657e-1352-7022-891f-ce3b6feeeba8",
  type: "page-type/world-class",
  slug: "destroyer-knight",
  title: "Destroyer Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
