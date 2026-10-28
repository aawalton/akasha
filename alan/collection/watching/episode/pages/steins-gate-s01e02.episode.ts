import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e02 = {
  id: "01a183d4-f6a6-7510-b753-70d2c6605cf2",
  type: "page-type/episode",
  slug: "steins-gate-s01e02",
  description: "Okabe is surprised to see Makise up and about after she was killed.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 2,
  publishedAt: "2011-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880885",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/2",
    },
  ],
  title: "Time Travel Paranoia",
  episodeType: "standard",
  stillPath: "/mIRuPZNEoGt0oyE9bL4BqEcmquq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
