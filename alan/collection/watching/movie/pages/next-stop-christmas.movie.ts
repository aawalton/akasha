import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nextStopChristmas = {
  id: "01a1749a-259c-7643-93a7-67a2a49dd5e5",
  type: "page-type/movie",
  slug: "next-stop-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877004",
      externalLink: "https://www.themoviedb.org/movie/877004",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Next Stop, Christmas",
  genres: ["TV Movie", "Fantasy", "Drama", "Romance", "Comedy"],
  imdbId: "tt15412176",
  posterPath: "/f4Y8hRSAfGiSkGoKvS5sruW40me.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
