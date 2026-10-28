import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS03e04 = {
  id: "01a183d8-4895-7b2a-8d9c-36666ac285f3",
  type: "page-type/episode",
  slug: "sailor-moon-s03e04",
  description:
    "Concerned that she is not intelligent enough for the sophisticated Mamoru, Usagi seeks advice from Michiru.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-3"],
  position: 4,
  publishedAt: "1994-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992403",
      externalLink: "https://www.themoviedb.org/tv/3570/season/3/episode/4",
    },
  ],
  title: "Bad Harmony",
  episodeType: "standard",
  stillPath: "/tCKFOJkWyYLXV9iJyQcOMXML5f0.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
