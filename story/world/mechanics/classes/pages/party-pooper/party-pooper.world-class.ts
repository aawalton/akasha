import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const partyPooper = {
  id: "01a0657e-0236-792d-ae99-f0e85c9a61cb",
  type: "page-type/world-class",
  slug: "party-pooper",
  title: "Party Pooper",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
