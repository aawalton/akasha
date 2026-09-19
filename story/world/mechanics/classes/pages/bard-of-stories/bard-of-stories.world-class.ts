import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bardOfStories = {
  id: "01a0657e-1339-7264-9faf-13570627bedf",
  type: "page-type/world-class",
  slug: "bard-of-stories",
  title: "Bard of Stories",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
