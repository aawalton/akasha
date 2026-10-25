import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const holidayForHeroes = {
  id: "01a1749a-06bc-794d-b45e-c06018ec2af0",
  type: "page-type/movie",
  slug: "holiday-for-heroes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626327",
      externalLink: "https://www.themoviedb.org/movie/626327",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Holiday for Heroes",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9747450",
  posterPath: "/rO43miSp5qkUatpzQAbou1a6std.jpg",
  voteAverage: 6.65,
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
