import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallPassingTime = {
  id: "01a0676a-d726-7063-85c6-392341a9d0be",
  type: "page-type/release",
  slug: "paul-cardall-passing-time",
  title: "Passing Time",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 14.059917,
  ownProgress: 14.059917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-02-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0XBLI2qaipLjefHBfBIXGT",
      externalLink: "https://open.spotify.com/album/0XBLI2qaipLjefHBfBIXGT",
    },
  ],
} as const satisfies Release
