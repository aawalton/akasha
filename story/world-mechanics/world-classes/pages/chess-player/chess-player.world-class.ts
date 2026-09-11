import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const chessPlayer = {
  id: "01a0657e-01c4-76d8-9c08-9517510ad33a",
  type: "world-class",
  slug: "chess-player",
  title: "Chess Player",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
