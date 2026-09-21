import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineRentFree = {
  id: "01a0676a-d727-7069-acda-446c565270bc",
  type: "page-type/release",
  slug: "jenna-raine-rent-free",
  title: "rent free",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 2.427883,
  ownProgress: 2.427883,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2022-11-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KmBjqHwSv3k07FwzX8Ju0",
      externalLink: "https://open.spotify.com/album/4KmBjqHwSv3k07FwzX8Ju0",
    },
  ],
} as const satisfies Release
