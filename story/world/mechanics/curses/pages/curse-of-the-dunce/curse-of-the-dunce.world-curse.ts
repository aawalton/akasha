import type { WorldCurse } from "akasha/story/world/mechanics/curses/world-curse.page-type.types.ts"

export const curseOfTheDunce = {
  id: "01a0655a-0687-7f80-92f7-7ecf0eb31fff",
  type: "page-type/world-curse",
  slug: "curse-of-the-dunce",
  title: "Curse of the Dunce",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCurse
