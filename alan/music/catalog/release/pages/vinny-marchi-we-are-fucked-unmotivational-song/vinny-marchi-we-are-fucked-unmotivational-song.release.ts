import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiWeAreFuckedUnmotivationalSong = {
  id: "01a0676a-d730-7029-80e7-356df3ddfe7d",
  type: "page-type/release",
  slug: "vinny-marchi-we-are-fucked-unmotivational-song",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-05-23",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bIuydV7r62CebBn02AmoE",
      externalLink: "https://open.spotify.com/album/2bIuydV7r62CebBn02AmoE",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "We Are Fucked (unmotivational song)",
} as const satisfies Release
