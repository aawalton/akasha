import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasMadeToOrder = {
  id: "01a17499-e802-7377-93ec-1a2027cac045",
  type: "page-type/movie",
  slug: "christmas-made-to-order",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550035",
      externalLink: "https://www.themoviedb.org/movie/550035",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Made to Order",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9028880",
  posterPath: "/wNs1pd1EBQKxJqnQaIkbpCw5gd8.jpg",
  voteAverage: 6.122,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
