import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishOceanEyes = {
  id: "01a0676a-d726-7012-bf16-98a75717e1b4",
  type: "release",
  slug: "billie-eilish-ocean-eyes",
  title: "Ocean Eyes",
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  ownLength: 3.342667,
  ownProgress: 3.342667,
  unit: "unit/minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2016-11-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2msN7XBgV3JCjQ7Tq3t7i9",
      externalLink: "https://open.spotify.com/album/2msN7XBgV3JCjQ7Tq3t7i9",
    },
  ],
} as const satisfies Release
