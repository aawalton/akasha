import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeYesIRememberItWell = {
  id: "01a17497-3827-7fce-802a-24b197b70379",
  type: "page-type/movie",
  slug: "jane-doe-yes-i-remember-it-well",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 5,
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
  streamingOn: ["streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
