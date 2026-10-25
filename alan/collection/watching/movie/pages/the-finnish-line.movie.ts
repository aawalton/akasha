import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theFinnishLine = {
  id: "01a1749a-89ab-7303-ad21-9d406280f2d7",
  type: "page-type/movie",
  slug: "the-finnish-line",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325917",
      externalLink: "https://www.themoviedb.org/movie/1325917",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/The_Finnish_Line" },
  ],
  title: "The Finnish Line",
  genres: ["TV Movie", "Romance", "Adventure"],
  imdbId: "tt31841975",
  posterPath: "/3lerMQaQX5nnotesTyNggH53ATU.jpg",
  voteAverage: 6.036,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
