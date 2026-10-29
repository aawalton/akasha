import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e11 = {
  id: "01a1884b-ef84-7e95-8430-fa055c50ac17",
  type: "page-type/episode",
  slug: "ncis-s22e11",
  description: "NCIS stages a fake wedding for two of its own in an attempt to take down the mob.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 11,
  publishedAt: "2025-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5874210",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/11",
    },
  ],
  title: "For Better or Worse",
  episodeType: "standard",
  stillPath: "/w7NBNbIksgGB9FSaxadGPfpR8hv.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
