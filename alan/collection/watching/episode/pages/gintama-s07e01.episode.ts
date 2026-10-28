import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS07e01 = {
  id: "01a183d6-3271-7138-8d0d-4a9a0bb0d1f1",
  type: "page-type/episode",
  slug: "gintama-s07e01",
  description:
    "Gin finds a strange clock and accidentally breaks it, causing all time in the universe to come to a stop.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-7"],
  position: 1,
  publishedAt: "2015-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1163757",
      externalLink: "https://www.themoviedb.org/tv/57041/season/7/episode/1",
    },
  ],
  title: "You Can Never Pause at the Perfect Time",
  episodeType: "standard",
  stillPath: "/apO3905dT9eyWnrDtT3BGASziP0.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
