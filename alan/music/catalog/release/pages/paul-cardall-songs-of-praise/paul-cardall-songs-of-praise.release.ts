import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSongsOfPraise = {
  id: "01a0676a-d729-706b-a1cf-c7d272fc3bda",
  type: "page-type/release",
  slug: "paul-cardall-songs-of-praise",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2007-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07NBxNrDIfAxHsPlsSzd8K",
      externalLink: "https://open.spotify.com/album/07NBxNrDIfAxHsPlsSzd8K",
    },
  ],
  title: "Songs of Praise",
} as const satisfies Release
