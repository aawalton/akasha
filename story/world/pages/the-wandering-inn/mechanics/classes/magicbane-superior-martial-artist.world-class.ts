import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicbaneSuperiorMartialArtist = {
  id: "01a0657e-022b-7f24-9521-4af0f74a769d",
  type: "page-type/world-class",
  slug: "magicbane-superior-martial-artist",
  title: "Magicbane Superior Martial Artist",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/strongest-martial-artist-of-pomle"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.043Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
