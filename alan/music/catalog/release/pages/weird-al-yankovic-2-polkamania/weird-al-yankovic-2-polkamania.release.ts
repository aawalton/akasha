import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2Polkamania = {
  id: "01a0676a-d727-7002-84c7-6b62db4fc59b",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-polkamania",
  title: "Polkamania!",
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 4.1008,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-07-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gqDuax64n9FHQxaFlyobc",
      externalLink: "https://open.spotify.com/album/1gqDuax64n9FHQxaFlyobc",
    },
  ],
} as const satisfies Release
