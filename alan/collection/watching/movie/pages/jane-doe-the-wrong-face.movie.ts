import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeTheWrongFace = {
  id: "01a17497-3826-71c9-b60f-95093aea8f2e",
  type: "page-type/movie",
  slug: "jane-doe-the-wrong-face",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 4,
  publishedAt: "2005-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "68678",
      externalLink: "https://www.themoviedb.org/movie/68678",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: The Wrong Face",
  genres: ["Crime", "Drama", "Mystery", "TV Movie"],
  imdbId: "tt0440512",
  posterPath: "/koIgrMtp3sbsS6uNgGnAyMQtT2H.jpg",
  voteAverage: 6.4,
  streamingOn: ["streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
