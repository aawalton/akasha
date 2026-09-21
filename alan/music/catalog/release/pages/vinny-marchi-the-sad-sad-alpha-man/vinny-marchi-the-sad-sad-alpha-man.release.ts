import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheSadSadAlphaMan = {
  id: "01a0676a-d72e-7002-a782-5d63dffde1c3",
  type: "page-type/release",
  slug: "vinny-marchi-the-sad-sad-alpha-man",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2024-03-29",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2weyor2NCq1F1F2sST2fOi",
      externalLink: "https://open.spotify.com/album/2weyor2NCq1F1F2sST2fOi",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The Sad Sad Alpha Man",
} as const satisfies Release
