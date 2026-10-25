import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const northToHome = {
  id: "01a1749a-66c0-79a5-8230-7dc31b9757fd",
  type: "page-type/movie",
  slug: "north-to-home",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910772",
      externalLink: "https://www.themoviedb.org/movie/910772",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "North to Home",
  genres: ["TV Movie", "Drama", "Family", "Romance"],
  imdbId: "tt15822830",
  posterPath: "/5iKw3VjDs5TvuM5T2x6kSvb4fTT.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
