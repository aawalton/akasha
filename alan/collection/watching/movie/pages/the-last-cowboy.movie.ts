import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLastCowboy = {
  id: "01a17497-195e-7e01-a660-18862d9d936e",
  type: "page-type/movie",
  slug: "the-last-cowboy",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2003-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54504",
      externalLink: "https://www.themoviedb.org/movie/54504",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Last Cowboy",
  genres: ["Action", "Drama", "TV Movie"],
  imdbId: "tt0325706",
  posterPath: "/u3wVpTNMKbHKo1Qb3hda6Fwjcx.jpg",
  voteAverage: 5.875,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:41.911Z",
  updatedAt: "2026-10-25T19:43:41.911Z",
} as const satisfies Movie
