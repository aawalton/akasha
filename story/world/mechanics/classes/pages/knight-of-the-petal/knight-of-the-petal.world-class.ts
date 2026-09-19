import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightOfThePetal = {
  id: "01a0657e-137d-74f3-878c-0d7d6944f5e9",
  type: "page-type/world-class",
  slug: "knight-of-the-petal",
  title: "Knight of the Petal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
