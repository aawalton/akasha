import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const king = {
  id: "01a0657e-137c-7d7a-b172-202731b2a6cc",
  type: "page-type/world-class",
  slug: "king",
  title: "King",
  world: "world/the-wandering-inn",
  appearanceCount: 229,
  aliases: ["kings"],
  evolvesToSlugs: ["world-class/king-of-challenges"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.476Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
