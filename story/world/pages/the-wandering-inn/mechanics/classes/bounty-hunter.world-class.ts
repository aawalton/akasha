import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bountyHunter = {
  id: "01a0657e-1340-7a77-a4ed-c05c4992e4b3",
  type: "page-type/world-class",
  slug: "bounty-hunter",
  title: "Bounty Hunter",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  aliases: ["bounty-hunters"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.416Z",
  updatedAt: "2026-09-22T13:28:33.000Z",
} as const satisfies WorldClass
