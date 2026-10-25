import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const meddlingMom = {
  id: "01a17499-66a0-7cc8-9e69-7588b4354073",
  type: "page-type/movie",
  slug: "meddling-mom",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2013-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "218220",
      externalLink: "https://www.themoviedb.org/movie/218220",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Meddling Mom",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt2256761",
  posterPath: "/1A4NZuVbdaLy7AIkHAR7sVTuXui.jpg",
  voteAverage: 4.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
