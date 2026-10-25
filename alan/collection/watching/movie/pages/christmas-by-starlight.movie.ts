import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasByStarlight = {
  id: "01a1749a-06ba-7234-8d33-6e31aeccdd90",
  type: "page-type/movie",
  slug: "christmas-by-starlight",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746045",
      externalLink: "https://www.themoviedb.org/movie/746045",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas by Starlight",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13206476",
  posterPath: "/zYIfYIz0FRSZKrgz7cuw0NKX0NC.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
