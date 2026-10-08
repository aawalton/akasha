import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightSeekerOfTheSilverDragon = {
  id: "01a0657e-137d-797e-bde2-28613d9d98ac",
  type: "page-type/world-class",
  slug: "knight-seeker-of-the-silver-dragon",
  title: "Knight-Seeker of the Silver Dragon",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  evolvesFromSlugs: ["world-class/knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.477Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
