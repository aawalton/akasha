import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strongestMartialArtistOfPomle = {
  id: "01a0657e-0261-7c0d-8209-6a0e11ab541e",
  type: "page-type/world-class",
  slug: "strongest-martial-artist-of-pomle",
  title: "Strongest Martial Artist of Pomle",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: [
    "world-class/magicbane-superior-martial-artist",
    "world-class/superior-martial-artist",
  ],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.097Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
