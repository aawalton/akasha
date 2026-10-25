import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeYesIRememberItWell = {
  id: "01a17497-3827-7fce-802a-24b197b70379",
  type: "page-type/movie",
  slug: "jane-doe-yes-i-remember-it-well",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 4,
  publishedAt: "2006-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "111177",
      externalLink: "https://www.themoviedb.org/movie/111177",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: Yes, I Remember It Well",
  genres: ["Mystery", "Crime", "Drama", "TV Movie"],
  imdbId: "tt0472269",
  posterPath: "/jGXqKhBGBlBLTHsGfcmIgtxPyk0.jpg",
  voteAverage: 6.1,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
