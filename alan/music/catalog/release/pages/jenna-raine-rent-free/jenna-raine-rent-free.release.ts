import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineRentFree = {
  id: "01a0676a-d727-7069-acda-446c565270bc",
  type: "page-type/release",
  slug: "jenna-raine-rent-free",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2022-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KmBjqHwSv3k07FwzX8Ju0",
      externalLink: "https://open.spotify.com/album/4KmBjqHwSv3k07FwzX8Ju0",
    },
  ],
  title: "rent free",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
