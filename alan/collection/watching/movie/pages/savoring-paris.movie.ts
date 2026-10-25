import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const savoringParis = {
  id: "01a1749a-89aa-75ac-9b86-dd69e93d53a2",
  type: "page-type/movie",
  slug: "savoring-paris",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-06-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1285266",
      externalLink: "https://www.themoviedb.org/movie/1285266",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Savoring Paris",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt32281200",
  posterPath: "/863fQQrr7zzxPZXdSgXE5aEiz9p.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
