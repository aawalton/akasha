import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warriorQueen = {
  id: "01a0657e-0270-7e6e-8aaa-bdbb7f2f820f",
  type: "page-type/world-class",
  slug: "warrior-queen",
  title: "Warrior Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
