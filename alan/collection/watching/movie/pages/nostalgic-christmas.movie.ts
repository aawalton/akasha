import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nostalgicChristmas = {
  id: "01a1749a-06be-7e3a-a882-44d281459835",
  type: "page-type/movie",
  slug: "nostalgic-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "630894",
      externalLink: "https://www.themoviedb.org/movie/630894",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nostalgic Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10571920",
  posterPath: "/aYmvx1UxiUwBJ7AaKbQk8vlUR3Y.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
