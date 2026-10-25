import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeEyeOfTheBeholder = {
  id: "01a17497-3826-7742-9c0d-be5d8761ca7c",
  type: "page-type/movie",
  slug: "jane-doe-eye-of-the-beholder",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 9,
  publishedAt: "2008-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "111293",
      externalLink: "https://www.themoviedb.org/movie/111293",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: Eye of the Beholder",
  genres: ["Crime", "Drama", "Mystery", "TV Movie"],
  imdbId: "tt0837119",
  posterPath: "/5NDwhWtqxywshyGzfvLL0EIeJrv.jpg",
  voteAverage: 6.1,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
