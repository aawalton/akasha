import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS23e04 = {
  id: "01a1884b-ef85-78eb-9914-d2762c20b452",
  type: "page-type/episode",
  slug: "ncis-s23e04",
  description:
    "The team investigates a U.S. marine who is believed to have kidnapped a man's wife.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-23"],
  position: 4,
  publishedAt: "2025-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6507641",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23/episode/4",
    },
  ],
  title: "Gone Girls",
  episodeType: "standard",
  stillPath: "/wvQPB6lmDhHjOo04artjK7ijN4C.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
