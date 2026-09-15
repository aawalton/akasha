import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenTheEssentialLeonardCohen = {
  id: "01a0676a-d72d-7009-8500-ef8a4b55eb8b",
  type: "page-type/release",
  slug: "leonard-cohen-the-essential-leonard-cohen",
  title: "The Essential Leonard Cohen",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 155.89205,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2t2sAWQl1NwwHy793LyEfR",
      externalLink: "https://open.spotify.com/album/2t2sAWQl1NwwHy793LyEfR",
      lastSyncedAt: "2025-10-10",
    },
  ],
} as const satisfies Release
