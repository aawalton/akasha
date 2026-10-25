import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aKismetChristmas = {
  id: "01a1749a-4648-7fb2-8f92-ef8ed343de2a",
  type: "page-type/movie",
  slug: "a-kismet-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027351",
      externalLink: "https://www.themoviedb.org/movie/1027351",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Kismet Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22196454",
  posterPath: "/iQE2kNsCX7qCZ6NXBlguIYW1uHa.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
