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
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-15T16:40:16.000Z",
} as const satisfies Release
