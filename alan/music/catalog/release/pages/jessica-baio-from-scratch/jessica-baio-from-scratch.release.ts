import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioFromScratch = {
  id: "01a17d9d-7a21-70f9-ba63-38fe18d61ee4",
  type: "page-type/release",
  slug: "jessica-baio-from-scratch",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2TjzLywRrPriy7x3nU1Mor",
      externalLink: "https://open.spotify.com/album/2TjzLywRrPriy7x3nU1Mor",
      lastSyncedAt: "2026-10-27",
    },
  ],
  title: "from scratch",
  createdAt: "2026-10-27T13:47:14.849Z",
  updatedAt: "2026-10-27T14:01:00.233Z",
} as const satisfies Release
