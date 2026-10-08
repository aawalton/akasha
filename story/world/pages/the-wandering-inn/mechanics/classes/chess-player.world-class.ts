import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chessPlayer = {
  id: "01a0657e-01c4-76d8-9c08-9517510ad33a",
  type: "page-type/world-class",
  slug: "chess-player",
  title: "Chess Player",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.940Z",
  updatedAt: "2026-09-22T13:28:41.000Z",
} as const satisfies WorldClass
