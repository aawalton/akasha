import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallPassingTime = {
  id: "01a0676a-d726-7063-85c6-392341a9d0be",
  type: "page-type/release",
  slug: "paul-cardall-passing-time",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2013-02-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XBLI2qaipLjefHBfBIXGT",
      externalLink: "https://open.spotify.com/album/0XBLI2qaipLjefHBfBIXGT",
    },
  ],
  title: "Passing Time",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
