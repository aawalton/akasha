import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onceUponAHoliday = {
  id: "01a17499-8948-77d2-a31c-aec18c9e35ef",
  type: "page-type/movie",
  slug: "once-upon-a-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "363482",
      externalLink: "https://www.themoviedb.org/movie/363482",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Once Upon a Holiday",
  genres: ["Family", "Romance", "TV Movie"],
  imdbId: "tt5033114",
  posterPath: "/mBiLHwCMUCmPfhhkTP87Ht65Qy1.jpg",
  voteAverage: 5.96,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
