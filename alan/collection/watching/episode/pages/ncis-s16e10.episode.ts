import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e10 = {
  id: "01a1884b-ef78-7c80-81d4-fde512a1aafe",
  type: "page-type/episode",
  slug: "ncis-s16e10",
  description:
    "The team’s holiday plans are put on hold when the murder investigation of a Navy veteran includes the discovery of a newborn baby who has no identification and no apparent ties to a family.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 10,
  publishedAt: "2018-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1626291",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/10",
    },
  ],
  title: "What Child Is This?",
  episodeType: "mid-season",
  stillPath: "/A1zCUimRihp6k6eqwazwwKReuQg.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
