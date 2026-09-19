import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bountyHunters = {
  id: "01a0657e-01bf-74cd-a9b0-7d12a2b89d4c",
  type: "page-type/world-class",
  slug: "bounty-hunters",
  title: "Bounty Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
