import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardall40HymnsForGuitar = {
  id: "01a0b4c8-184d-7249-ad75-5c68d2e7b2b8",
  type: "page-type/release",
  slug: "paul-cardall-40-hymns-for-guitar",
  ownLength: 122.26138333333333,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2026-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZmSKmWzQYFgbEAt3IqoqX",
      externalLink: "https://open.spotify.com/album/1ZmSKmWzQYFgbEAt3IqoqX",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "40 Hymns for Guitar",
} as const satisfies Release
