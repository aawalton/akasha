import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const twoTurtleDoves = {
  id: "01a1749a-06bf-7946-b231-46a4b9c891dc",
  type: "page-type/movie",
  slug: "two-turtle-doves",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626310",
      externalLink: "https://www.themoviedb.org/movie/626310",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Two Turtle Doves",
  genres: ["Drama", "Family", "Romance", "TV Movie"],
  imdbId: "tt10493490",
  posterPath: "/ayz1EFvswh1C3FyjOCI1KSHoXIj.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
