import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sylviaDaleyMakeFriends = {
  id: "01a0a6c3-6b01-7102-a837-aac19a571b6d",
  type: "page-type/release",
  slug: "sylvia-daley-make-friends",
  ownLength: 2.7020833333333334,
  ownProgress: 0,
  partOfCollections: ["artist/sylvia-daley"],
  position: 0,
  publishedAt: "2026-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Hh5UJdi6bbMaTRD2wZ0eT",
      externalLink: "https://open.spotify.com/album/2Hh5UJdi6bbMaTRD2wZ0eT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Make Friends",
} as const satisfies Release
