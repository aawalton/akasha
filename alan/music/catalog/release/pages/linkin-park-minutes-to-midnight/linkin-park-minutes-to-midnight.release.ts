import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkMinutesToMidnight = {
  id: "01a0676a-d724-706e-b4f7-bf7104b39acd",
  type: "page-type/release",
  slug: "linkin-park-minutes-to-midnight",
  title: "Minutes to Midnight",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 43.483467,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-05-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tlTBLz2w52rpGCLBGyGw6",
      externalLink: "https://open.spotify.com/album/2tlTBLz2w52rpGCLBGyGw6",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
