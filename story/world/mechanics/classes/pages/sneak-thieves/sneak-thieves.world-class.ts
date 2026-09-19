import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sneakThieves = {
  id: "01a0657e-025a-7703-b1a6-94e844beceb8",
  type: "page-type/world-class",
  slug: "sneak-thieves",
  title: "Sneak Thieves",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
