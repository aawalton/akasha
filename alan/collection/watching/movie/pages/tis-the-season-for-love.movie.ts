import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tisTheSeasonForLove = {
  id: "01a17499-8949-7d05-b3f6-60034ca3ff48",
  type: "page-type/movie",
  slug: "tis-the-season-for-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "362886",
      externalLink: "https://www.themoviedb.org/movie/362886",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Tis the Season for Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5056034",
  posterPath: "/cpWLQw59uTsrz27bDyPMrxn0Y.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
