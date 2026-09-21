import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishOceanEyes = {
  id: "01a0676a-d726-7012-bf16-98a75717e1b4",
  type: "page-type/release",
  slug: "billie-eilish-ocean-eyes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2016-11-18",
  rank: "A",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2msN7XBgV3JCjQ7Tq3t7i9",
      externalLink: "https://open.spotify.com/album/2msN7XBgV3JCjQ7Tq3t7i9",
    },
  ],
  title: "Ocean Eyes",
} as const satisfies Release
