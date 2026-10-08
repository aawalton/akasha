import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superiorMartialArtist = {
  id: "01a0657e-0261-7599-8cb6-0465e30bea4c",
  type: "page-type/world-class",
  slug: "superior-martial-artist",
  title: "Superior Martial Artist",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/strongest-martial-artist-of-pomle"],
  evolvesToSlugs: ["world-class/fist-of-the-living-world"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.097Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
