import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const seasonForLove = {
  id: "01a17499-c95f-7d89-a4b1-d5e7626737f3",
  type: "page-type/movie",
  slug: "season-for-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "543326",
      externalLink: "https://www.themoviedb.org/movie/543326",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Season_for_Love" },
  ],
  title: "Season for Love",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt8826626",
  posterPath: "/ahqtyGP0mXZ2fYWWcmhrpyQJrWn.jpg",
  voteAverage: 6.257,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
