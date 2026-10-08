import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightErrant = {
  id: "01a0657e-137c-74ae-ac8a-7bb304bc8199",
  type: "page-type/world-class",
  slug: "knight-errant",
  title: "Knight-Errant",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  aliases: ["Knight Errant", "knight-errants"],
  evolvesToSlugs: ["world-class/aura-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.476Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
