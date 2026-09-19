import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const betTaker = {
  id: "01a0657e-01bb-7474-882d-3647f6a38668",
  type: "page-type/world-class",
  slug: "bet-taker",
  title: "Bet Taker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
