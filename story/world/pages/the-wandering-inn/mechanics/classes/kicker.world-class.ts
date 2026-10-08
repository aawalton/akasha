import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kicker = {
  id: "01a0657e-1378-708c-b7af-d881aeb5c2b4",
  type: "page-type/world-class",
  slug: "kicker",
  title: "Kicker",
  world: "world/the-wandering-inn",
  appearanceCount: 13,
  aliases: ["kickers"],
  evolvesToSlugs: ["world-class/football-player"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.472Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
