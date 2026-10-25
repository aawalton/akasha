import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSnowMustGoOn = {
  id: "01a1749a-a94d-7f13-a32c-c71d29a358e4",
  type: "page-type/movie",
  slug: "the-snow-must-go-on",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547920",
      externalLink: "https://www.themoviedb.org/movie/1547920",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Snow Must Go On",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt38354943",
  posterPath: "/zixxwy8GbxnqbKdViggwnoR611R.jpg",
  voteAverage: 5.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
