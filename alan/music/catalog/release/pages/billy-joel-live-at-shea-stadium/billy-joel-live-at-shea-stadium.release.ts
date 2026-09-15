import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelLiveAtSheaStadium = {
  id: "01a0676a-d723-7044-a2af-c4ed30c5bac2",
  type: "release",
  slug: "billy-joel-live-at-shea-stadium",
  title: "Live At Shea Stadium",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 128.580967,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-03-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zziqp3wOBkfWmxwlILVBZ",
      externalLink: "https://open.spotify.com/album/4zziqp3wOBkfWmxwlILVBZ",
    },
  ],
} as const satisfies Release
