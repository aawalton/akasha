import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eggBountyHunter = {
  id: "01a0657e-1359-70ba-9c70-c3f060a8e038",
  type: "page-type/world-class",
  slug: "egg-bounty-hunter",
  title: "Egg Bounty Hunter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
