import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chasingADream = {
  id: "01a17499-470b-7344-945c-da4f4e38bccc",
  type: "page-type/movie",
  slug: "chasing-a-dream",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "159417",
      externalLink: "https://www.themoviedb.org/movie/159417",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Chasing_a_Dream" },
  ],
  title: "Chasing a Dream",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt1264894",
  posterPath: "/wyszVbHFePiSoq6wzMIwQORTfBY.jpg",
  voteAverage: 6.3,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
