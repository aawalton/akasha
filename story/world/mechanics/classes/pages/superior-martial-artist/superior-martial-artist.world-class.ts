import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const superiorMartialArtist = {
  id: "01a0657e-0261-7599-8cb6-0465e30bea4c",
  type: "page-type/world-class",
  slug: "superior-martial-artist",
  title: "Superior Martial Artist",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["strongest-martial-artist-of-pomle"],
  evolvesToSlugs: ["fist-of-the-living-world"],
  references: "jsonl",
} as const satisfies WorldClass
