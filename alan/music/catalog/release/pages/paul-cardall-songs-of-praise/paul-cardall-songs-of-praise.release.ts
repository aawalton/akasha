import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSongsOfPraise = {
  id: "01a0676a-d729-706b-a1cf-c7d272fc3bda",
  type: "release",
  slug: "paul-cardall-songs-of-praise",
  title: "Songs of Praise",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 48.1555,
  ownProgress: 48.1555,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07NBxNrDIfAxHsPlsSzd8K",
      externalLink: "https://open.spotify.com/album/07NBxNrDIfAxHsPlsSzd8K",
    },
  ],
} as const satisfies Release
