import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e10 = {
  id: "01a183d7-7ce1-7d28-a5ba-a1930d96e468",
  type: "page-type/episode",
  slug: "hetalia-s02e10",
  description: "America and Japan both prepare for the New Year and the coming of spring.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 10,
  publishedAt: "2009-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797703",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/10",
    },
  ],
  title: "Why Americans Love Spring",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
