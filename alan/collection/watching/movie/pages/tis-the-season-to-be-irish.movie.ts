import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tisTheSeasonToBeIrish = {
  id: "01a1749a-89ac-7845-88db-1ce11d5776d1",
  type: "page-type/movie",
  slug: "tis-the-season-to-be-irish",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360791",
      externalLink: "https://www.themoviedb.org/movie/1360791",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Tis the Season to Be Irish",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt33164321",
  posterPath: "/i1z1goMHlFqjjoEkOwwm2hZEZyN.jpg",
  voteAverage: 6.523,
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
