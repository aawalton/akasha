import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const apprenticeTrader = {
  id: "01a0657e-132d-7c99-a38b-3cff52944d68",
  type: "page-type/world-class",
  slug: "apprentice-trader",
  title: "Apprentice Trader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
